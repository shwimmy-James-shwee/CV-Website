import './App.css';
import AppRoutes from './AppRoutes';
import './styles/global-imports.scss';

import UserProvider from './context/UserContext';
// import GradienFullPage from './components/layout/GradienFullPage';
// import NotValidPage from './components/page/NotValidPage';
// import ButtonComponent from './components/toolkit/Button';

const Pages = () => {
  // Auth goes here
  return <AppRoutes />;
};

const MainApplication = () => (
  <UserProvider>
    <Pages />
  </UserProvider>
);

const LoggedOutApp = ({ url }: { url: string }) => {
  let title = 'Logged Out';
  if (url.includes('multiple-sessions')) {
    title = 'Multiple Sessions Detected';
  }
  return (
    // <GradienFullPage>
    //   <NotValidPage title={title} body='To return to the login page, please click the button below'>
    //     <a href='/'>
    //       <ButtonComponent label='Login' className='mt-4' />
    //     </a>
    //   </NotValidPage>
    // </GradienFullPage>
    <>
      <p>err - {title}</p>
    </>
  );
};

function App() {
  const logoutRedirectRegex = /^http[s]?:\/\/[^/]+\/logout*/;
  const siteUrl = window.location.href;
  const isOnLogoutRedirectPage = logoutRedirectRegex.test(window.location.href);
  if (isOnLogoutRedirectPage) {
    return <LoggedOutApp url={siteUrl} />;
  }
  return <MainApplication />;
}

export default App;
