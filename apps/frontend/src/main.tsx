import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// import React from 'react'

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
if (window.self === window.top) {
  root.render(
    // https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/5468
    // <React.StrictMode>
    <App
    //  instance={msalInstance}
    />
    // </React.StrictMode>,
  );
} else {
  root.render(
    <div>
      <h1 style={{ color: "red" }}>
        If you see this page, Web App link you have clicked on is under click jacking security attack.
      </h1>
      <h2>Please inform team with the reference of the application from where you clicked this link.</h2>
      <h2>
        Click
        <a
          style={{ color: "red", textDecoration: "none" }}
          href={window.self.location.href}
          title='Web Application'
          target='blank'
        >
          here
        </a>
        to access WebApp safely.
      </h2>
    </div>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
