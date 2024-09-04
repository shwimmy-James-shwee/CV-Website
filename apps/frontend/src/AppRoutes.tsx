import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { pageUrl } from './PageUrls';
import LandingPage from './pages/LandingPage';
import NavBar, { navLinkItemProps } from './components/layout/TopNavBar';
import FooterBar from './components/layout/FooterBar';
import { loginRequest } from './authConfig';
import PageTimer from './hooks/PageTimer';
import { useContext, useRef } from 'react';
import { UserContext } from './context/UserContext';
import UserActivityPage from './pages/UserActivityPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { UserReturnStatus } from './enum';
import GradienFullPage from './components/layout/GradienFullPage';
import FullFrameSpinner from './components/toolkit/FullFrameSpinner';
import NotValidPage from './components/page/NotValidPage';
import AlertProvider from './components/toolkit/AlertContext';
import AlertComponent from './components/toolkit/Alert';
import { UserRole } from '@core/db/schema';

// this guarantees that the container will always be full width and Row/Col will be contained within it
const HighLevelContainer = styled(Container)`
  margin: 0;
  padding: 0;
`;

const LandingPageRoute = () => {
  return (
    <HighLevelContainer fluid>
      {/* <Modal /> */}
      <LandingPage />
    </HighLevelContainer>
  );
};

// Example Routes below, replaces with your pages
const FAQRoute = () => {
  return (
    <HighLevelContainer fluid>
      {/* <Modal /> */}
      <FAQPage />
    </HighLevelContainer>
  );
};

const ContactRoute = () => {
  return (
    <HighLevelContainer fluid>
      {/* <Modal /> */}
      <ContactPage />
    </HighLevelContainer>
  );
};

const UserActivityRoute = () => {
  return (
    <HighLevelContainer fluid>
      {/* <Modal /> */}
      <UserActivityPage />
    </HighLevelContainer>
  );
};

const AdminRoute = () => {
  return (
    <HighLevelContainer fluid>
      {/* <Modal /> */}
      <AdminPage />
    </HighLevelContainer>
  );
};

function AppRoutes() {
  const { instance } = useMsal();
  const { currentUserData, userReturnStatus, setCurrentUserData } = useContext(UserContext);
  const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error: Error) => window.alert(error));
  };

  const handleLogoutRedirect = () => {
    setCurrentUserData(null);
    instance.logoutRedirect();
  };

  const handleIdleSession = () => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(
      () => {
        handleLogoutRedirect();
      },
      15 * 60 * 1000,
    );
  };

  const navLinkItems: navLinkItemProps[] = [
    { lable: 'Home', url: pageUrl.landingPage },
    { lable: 'FAQ', url: pageUrl.faqPage },
    { lable: 'Contact', url: pageUrl.contactPage },
    { lable: 'User Activity', url: pageUrl.userActivityPage },
    {
      lable: 'Admin',
      url: pageUrl.adminPage,
      hide: !currentUserData?.roles?.includes(UserRole.ADMINISTRATOR),
    },
  ];

  if (userReturnStatus === UserReturnStatus.LOADING) {
    return (
      <GradienFullPage>
        <FullFrameSpinner animation='grow' scale={3} />
      </GradienFullPage>
    );
  } else if (userReturnStatus === UserReturnStatus.NOT_INVITED) {
    return (
      <GradienFullPage>
        <NotValidPage
          title='Invitation Required'
          body="Oops! It seems like you haven't been invited to access this app. Please contact your team administrator for assistance."
        />
      </GradienFullPage>
    );
  } else if (userReturnStatus === UserReturnStatus.SUCCESS) {
    return (
      <AlertProvider>
        <AlertComponent />
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <PageTimer onPageClickFunction={handleIdleSession} />
            <NavBar
              handleLogin={handleLoginRedirect}
              handleLogout={handleLogoutRedirect}
              userLoggedIn={!!currentUserData}
              navLinkItems={navLinkItems}
            />

            <div style={{ flex: '1' }}>
              <Routes>
                {/* Public Routes */}
                <Route path={pageUrl.landingPage} element={<LandingPageRoute />} />
                <Route path={pageUrl.faqPage} element={<FAQRoute />} />
                <Route path={pageUrl.contactPage} element={<ContactRoute />} />
                <Route path={pageUrl.userActivityPage} element={<UserActivityRoute />} />

                {/* Admin Routes */}
                {currentUserData?.roles?.includes(UserRole.ADMINISTRATOR) && (
                  <Route path={pageUrl.adminPage} element={<AdminRoute />} />
                )}
                {/* New Routes can be added below */}

                {/* New Routes can be added above */}
                <Route path='*' element={<NotFoundPage />} />
              </Routes>
            </div>
            <FooterBar
              redirectUrls={[
                { url: 'https://kpmg.com/nz/en/home/misc/privacy.html', label: 'Privacy' },
                { url: 'https://kpmg.com/nz/en/home.html', label: 'KPMG New Zealand' },
              ]}
            />
          </div>
        </Router>
      </AlertProvider>
    );
  }
}

export default AppRoutes;
