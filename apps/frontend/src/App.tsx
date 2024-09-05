import './App.css';
import AppRoutes from './AppRoutes';
import './styles/global-imports.scss';

import { MsalAuthenticationTemplate, MsalProvider, useMsal } from '@azure/msal-react';
import {
  AccountInfo,
  AuthError,
  AuthenticationResult,
  EventMessage,
  EventType,
  IPublicClientApplication,
  InteractionType,
} from '@azure/msal-browser';
import { b2cPolicies, loginRequest, protectedResources } from './authConfig';
import { useEffect, useRef } from 'react';
import { compareIssuingPolicy } from './utils/MsalClaims';
import UserProvider from './context/UserContext';
import GradienFullPage from './components/layout/GradienFullPage';
import NotValidPage from './components/page/NotValidPage';
import ButtonComponent from './components/toolkit/Button';

const Pages = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress value
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal(); // const { instance, inProgress } = useMsal() // TODO revise inProgress variable usage
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const activeAccount = instance.getActiveAccount();
  useEffect(() => {
    const callbackId = instance.addEventCallback((event: EventMessage) => {
      const payload = event.payload as AuthenticationResult & AccountInfo;
      // const payloadToken = event.payload as AccountInfo

      // if (event.eventType === EventType.ACQUIRE_TOKEN_NETWORK_START) {
      // } else

      if (
        (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
        payload.account
      ) {
        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth
         * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
         * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
         * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */
        if (compareIssuingPolicy(payload.idTokenClaims, b2cPolicies.names.signUpSignIn)) {
          // retrieve the account from initial sign-in to the app
          const originalSignInAccount = instance.getAllAccounts().find(
            (account) =>
              account.idTokenClaims?.oid === payload.idTokenClaims.oid && // TODO resolve ?.?
              account.idTokenClaims?.sub === payload.idTokenClaims.sub && // TODO resolve ?.?
              compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn),
          );

          const signUpSignInFlowRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            account: originalSignInAccount,
            scopes: [...protectedResources.api.scopes.read, ...protectedResources.api.scopes.write],
          };

          // silently login again with the signUpSignIn policy
          instance.acquireTokenSilent(signUpSignInFlowRequest);
          if (timer.current !== null) {
            clearInterval(timer.current);
          }
          timer.current = setInterval(() => {
            instance.acquireTokenSilent(signUpSignInFlowRequest);
          }, 10000);
          // was using SSOSilent, but there were issue in retrieving when there is multiple session.
        }
      }

      if (event.eventType === EventType.LOGIN_FAILURE) {
        const eventerror = event.error as AuthError;
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (eventerror && eventerror.errorMessage.includes('AADB2C90118')) {
          const resetPasswordRequest = {
            authority: b2cPolicies.authorities.forgotPassword.authority,
            scopes: [],
          };
          instance.loginRedirect(resetPasswordRequest);
        }

        // if user click cancel on signup sent back to login page
        if (eventerror && eventerror.errorMessage.includes('AADB2C90091')) {
          const loginRequest = {
            authority: b2cPolicies.authorities.signUpSignIn.authority,
            scopes: [...protectedResources.api.scopes.read, ...protectedResources.api.scopes.write],
          };
          instance.loginRedirect(loginRequest);
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return activeAccount && <AppRoutes />;
};

type AppProps = {
  instance: IPublicClientApplication;
};

const MainApplication = ({ instance }: AppProps) => (
  <MsalProvider instance={instance}>
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={{ ...loginRequest }}>
      <UserProvider>
        <Pages />
      </UserProvider>
    </MsalAuthenticationTemplate>
  </MsalProvider>
);

const LoggedOutApp = ({ url }: { url: string }) => {
  let title = 'Logged Out';
  if (url.includes('multiple-sessions')) {
    title = 'Multiple Sessions Detected';
  }
  return (
    <GradienFullPage>
      <NotValidPage title={title} body='To return to the login page, please click the button below'>
        <a href='/'>
          <ButtonComponent label='Login' className='mt-4' />
        </a>
      </NotValidPage>
    </GradienFullPage>
  );
};

function App(props: AppProps) {
  const logoutRedirectRegex = /^http[s]?:\/\/[^/]+\/logout*/;
  const siteUrl = window.location.href;
  const isOnLogoutRedirectPage = logoutRedirectRegex.test(window.location.href);
  if (isOnLogoutRedirectPage) {
    return <LoggedOutApp url={siteUrl} />;
  }
  return <MainApplication {...props} />;
}

export default App;
