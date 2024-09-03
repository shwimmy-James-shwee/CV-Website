import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import defautLogo from '../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { CurrentUserType } from '../../context/UserContext';
import ButtonComponent from '../toolkit/Button';
import { TitleText } from '../text/TitleText';

export interface navLinkItemProps {
  label: string;
  url: string;
  icon: string;
  hide?: boolean;
}
interface NavBarProps {
  handleLogin: () => void;
  handleLogout: () => void;
  navLogo?: string;
  userLoggedIn: boolean;
  userAvatar?: JSX.Element;
  navLinkItems: navLinkItemProps[];
  children?: ReactNode;
  currentUserData?: CurrentUserType | null;
  toolName?: string;
}

const StyledContainer = styled(Container)`
  height: 100vh;
  background-image: var(--default-gradient-bg);
  overflow: hidden;
`;
const NavCol = styled(Col)`
  @media screen and (min-width: 576px) {
    width: fit-content;
  }
  @media screen and (max-width: 576px) {
    min-width: 100px;
  }

  height: 100%;
`;
const StyledNavbar = styled(Navbar)`
  min-height: 100%;
  max-height: 100%;
  padding: 1.25rem 0.75rem;
  @media screen and (max-width: 576px) {
    padding: 0;
  }

  overflow-x: hidden;
`;
// TODO: Download font and put in asset folder
const StyledToolName = styled.p`
  color: var(--navbar-nav-link-cl);
  font-family: 'Encode Sans Condensed', sans-serif;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 130%; /* 46.8px */
  text-align: center;
  margin-bottom: 0.75rem;
  padding: 0px;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--navbar-nav-link-cl) !important;
  padding: 0.75rem !important;
  margin-bottom: 1.5rem;
  font-weight: 600;

  &.active {
    background-color: rgba(var(--navbar-nav-link-active-bg-rgb), 0.2);
    border-radius: 0.25rem;
  }
  &:hover {
    background-color: rgba(var(--navbar-nav-link-active-bg-rgb), 0.2);
    border-radius: 0.25rem;
  }
`;

const ContentCol = styled(Col)`
  height: calc(100% - 1.25rem);
  border-radius: 1.25rem 0 0 0;
  background-color: var(--content-column-bg);
  margin-top: 1.25rem;
  overflow-x: auto;
`;

const MenuBox = styled(Navbar.Collapse)`
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 16px var(--theme-tertiary-background-color);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--theme-primary-background-color);
    -webkit-box-shadow: inset 0 0 6px var(--theme-primary-background-color);
  }
`;

function NavBar({
  handleLogin,
  handleLogout,
  navLogo,
  userLoggedIn,
  userAvatar,
  navLinkItems,
  children,
  toolName,
}: NavBarProps) {
  const LoginButton = () => {
    return (
      <Button variant='light' size='sm' onClick={handleLogin}>
        Login
      </Button>
    );
  };

  const LogoutButton = () => {
    return (
      <ButtonComponent
        label='Logout'
        icon='logout'
        onClick={handleLogout}
        // style={{ marginBottom: '2.75rem' }}
        className='mb-4'
      />
    );
  };

  return (
    <StyledContainer fluid>
      <Row className='h-100'>
        <NavCol xs={3} className='p-0 m-0 user-select-none'>
          <StyledNavbar data-testid='nav-bar' className='d-flex flex-column'>
            <Navbar.Brand href='/' className='mx-auto' style={{ padding: '2.75rem 0 1.5rem' }}>
              <img alt='' className='w-50 mx-auto d-block' src={navLogo || defautLogo} />
            </Navbar.Brand>
            <StyledToolName>{toolName}</StyledToolName>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <MenuBox id='basic-navbar-nav' className='flex-column py-5 overflow-auto'>
              <Nav className='flex-column'>
                {navLinkItems.map(
                  (item) =>
                    !item.hide && (
                      <StyledNavLink
                        to={item.url}
                        className='nav-link body-bold text-center d-flex flex-column'
                        key={item.url}
                      >
                        <span className='material-icons-outlined' style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>
                          {item.icon}
                        </span>
                        <TitleText size={1} color='var(--navbar-nav-link-cl)'>
                          {item.label}
                        </TitleText>
                      </StyledNavLink>
                    ),
                )}
              </Nav>
            </MenuBox>
            {userAvatar?.key ? userAvatar : userLoggedIn ? <LogoutButton /> : <LoginButton />}
          </StyledNavbar>
        </NavCol>

        <ContentCol className='p-0'>{children}</ContentCol>
      </Row>
    </StyledContainer>
  );
}

export default NavBar;
