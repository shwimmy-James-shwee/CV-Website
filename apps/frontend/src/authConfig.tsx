/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Configuration, LogLevel } from '@azure/msal-browser'

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit: https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
  names: {
    signUpSignIn: import.meta.env.VITE_POLICY_NAME_SIGN_IN_UP,
    forgotPassword: import.meta.env.VITE_POLICY_NAME_RESET,
    editProfile: import.meta.env.VITE_POLICY_NAME_EDIT_PROFILE,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${import.meta.env.VITE_B2C_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_B2C_TENANT_NAME}.onmicrosoft.com/${import.meta.env.VITE_POLICY_NAME_SIGN_IN_UP}`,
    },
    forgotPassword: {
      authority: `https://${import.meta.env.VITE_B2C_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_B2C_TENANT_NAME}.onmicrosoft.com/${import.meta.env.VITE_POLICY_NAME_RESET}`,
    },
    editProfile: {
      authority: `https://${import.meta.env.VITE_B2C_TENANT_NAME}.b2clogin.com/${import.meta.env.VITE_B2C_TENANT_NAME}.onmicrosoft.com/${import.meta.env.VITE_POLICY_NAME_EDIT_PROFILE}`,
    },
  },
  authorityDomain: `${import.meta.env.VITE_B2C_TENANT_NAME}.b2clogin.com`,
}

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_B2C_CLIENT_ID || '', // This is the ONLY mandatory field that you need to supply.
    authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
    redirectUri: '/', // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: '/logout', // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            // eslint-disable-next-line no-console
            console.error(message)
            return
          case LogLevel.Info:
            // console.info(message)
            return
          case LogLevel.Verbose:
            // console.debug(message)
            return
          case LogLevel.Warning:
            // eslint-disable-next-line no-console
            console.warn(message)
            return
          default:
            return
        }
      },
    },
  },
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  api: {
    scopes: {
      read: [`https://${import.meta.env.VITE_B2C_TENANT_NAME}.onmicrosoft.com/api/Client.Read`],
      write: [`https://${import.meta.env.VITE_B2C_TENANT_NAME}.onmicrosoft.com/api/Client.Write`],
    },
  },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [...protectedResources.api.scopes.read, ...protectedResources.api.scopes.write],
}
