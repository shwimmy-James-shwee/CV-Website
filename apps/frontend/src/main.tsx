import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import reportWebVitals from './reportWebVitals'

import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser'
import { msalConfig } from './authConfig'
import { Md5 } from 'ts-md5'
// import React from 'react'

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const msalInstance = new PublicClientApplication(msalConfig)

if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

msalInstance.enableAccountStorageEvents()

msalInstance.addEventCallback((event: EventMessage) => {
  const payload = event.payload as AuthenticationResult
  if (
    (event.eventType === EventType.LOGIN_SUCCESS ||
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
      event.eventType === EventType.SSO_SILENT_SUCCESS) &&
    payload.account
  ) {
    msalInstance.setActiveAccount(payload.account)
    const uniqueSessionMd5 = Md5.hashStr(JSON.stringify(payload.account.idTokenClaims))
    sessionStorage.setItem('session.md5', uniqueSessionMd5.toString())
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
if (window.self === window.top) {
  root.render(
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5468
    // <React.StrictMode>
    <App instance={msalInstance} />,
    // </React.StrictMode>,
  )
} else {
  root.render(
    <div>
      <h1 style={{ color: 'red' }}>
        If you see this page, Web App link you have clicked on is under click jacking security
        attack.
      </h1>
      <h2>
        Please inform team with the reference of the application from where you clicked this link.
      </h2>
      <h2>
        Click
        <a
          style={{ color: 'red', textDecoration: 'none' }}
          href={window.self.location.href}
          title='Web Application'
          target='blank'
        >
          here
        </a>
        to access WebApp safely.
      </h2>
    </div>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
