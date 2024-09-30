import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { pageUrl } from './PageUrls';
import LandingPage from './pages/LandingPage';
import NavBar, { navLinkItemProps } from './components/layout/TopNavBar';
// import FooterBar from './components/layout/FooterBar';
// import { loginRequest } from './authConfig';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
// import UserActivityPage from './pages/UserActivityPage';

// import NotFoundPage from './pages/NotFoundPage';
// import AdminPage from './pages/AdminPage';
// import { UserReturnStatus } from './enum';
// import GradienFullPage from './components/layout/GradienFullPage';
// import FullFrameSpinner from './components/toolkit/FullFrameSpinner';
// import NotValidPage from './components/page/NotValidPage';
import AlertProvider from './components/toolkit/AlertContext';
// import AlertComponent from './components/toolkit/Alert';
import { UserRole } from '@core/db/schema';

// // this guarantees that the container will always be full width and Row/Col will be contained within it
// const HighLevelContainer = styled(Container)`
//   margin: 0;
//   padding: 0;
// `;

function AppRoutes() {
  const { currentUserData } = useContext(UserContext);
  // const { currentUserData, userReturnStatus } = useContext(UserContext);

  // const handleLoginRedirect = () => {
  //   instance.loginRedirect(loginRequest).catch((error: Error) => window.alert(error));
  // };

  // const handleLogoutRedirect = () => {
  //   setCurrentUserData(null);
  //   instance.logoutRedirect();
  // };

  // const handleIdleSession = () => {
  //   if (timer.current !== null) {
  //     clearTimeout(timer.current);
  //   }
  //   timer.current = setTimeout(
  //     () => {
  //       handleLogoutRedirect();
  //     },
  //     15 * 60 * 1000,
  //   );
  // };

  const navLinkItems: navLinkItemProps[] = [
    { lable: 'Home', url: pageUrl.landingPage },
    // { lable: 'FAQ', url: pageUrl.faqPage },
    // { lable: 'Contact', url: pageUrl.contactPage },
    { lable: 'User Activity', url: pageUrl.userActivityPage },
    {
      lable: 'Admin',
      url: pageUrl.adminPage,
      hide: !currentUserData?.roles?.includes(UserRole.ADMINISTRATOR),
    },
  ];

  // if (userReturnStatus === UserReturnStatus.LOADING) {
  //   return (
  //     <GradienFullPage>
  //       <FullFrameSpinner animation='grow' scale={3} />
  //     </GradienFullPage>
  //   );
  // } else if (userReturnStatus === UserReturnStatus.NOT_INVITED) {
  //   return (
  //     <GradienFullPage>
  //       <NotValidPage
  //         title='Invitation Required'
  //         body="Oops! It seems like you haven't been invited to access this app. Please contact your team administrator for assistance."
  //       />
  //     </GradienFullPage>
  //   );
  // } else
  // if (userReturnStatus === UserReturnStatus.SUCCESS) {
  return (
    <AlertProvider>
      {/* <AlertComponent /> */}
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar
            // handleLogin={() => {}}
            // handleLogout={() => {}}
            // userLoggedIn={!!currentUserData}
            navLinkItems={navLinkItems}
          />

          <div style={{ flex: '1' }}>
            <Routes>
              {/* Public Routes */}
              <Route path={pageUrl.landingPage} element={<LandingPage />} />
              {/* <Route path={pageUrl.userActivityPage} element={<UserActivityPage />} /> */}

              {/* Admin Routes */}
              {/* {currentUserData?.roles?.includes(UserRole.ADMINISTRATOR) && (
                  <Route path={pageUrl.adminPage} element={<AdminPage />} />
                )} */}
              {/* New Routes can be added below */}

              {/* New Routes can be added above */}
              {/* <Route path='*' element={<NotFoundPage />} /> */}
            </Routes>
          </div>
          {/* <FooterBar /> */}
        </div>
      </Router>
    </AlertProvider>
  );
  // }
}

export default AppRoutes;
