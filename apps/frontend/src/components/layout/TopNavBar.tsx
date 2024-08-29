import { Button, Nav, Navbar, Stack } from 'react-bootstrap'
import defautLogo from '../../assets/images/logo.png'
import '../_nav.scss'
import { NavLink } from 'react-router-dom'

export interface navLinkItemProps {
  lable: string
  url: string
  hide?: boolean
}
interface NavBarProps {
  handleLogin: () => void
  handleLogout: () => void
  navLogo?: string
  userLoggedIn: boolean
  userAvatar?: JSX.Element
  navLinkItems: navLinkItemProps[]
}

function NavBar({
  handleLogin,
  handleLogout,
  navLogo,
  userLoggedIn,
  userAvatar,
  navLinkItems,
}: NavBarProps) {
  const LoginButton = () => {
    return (
      <Button variant='light' size='sm' onClick={handleLogin}>
        Login
      </Button>
    )
  }

  const LogoutButton = () => {
    return (
      <Button variant='light' size='sm' onClick={handleLogout}>
        Log out
      </Button>
    )
  }

  return (
    <>
      <Navbar data-testid='nav-bar' className='navbar'>
        <Navbar.Brand href='/' className='me-0' style={{ width: '0px' }}>
          <img
            alt=''
            src={navLogo || defautLogo}
            height='28'
            className='ps-2 d-inline-block align-top'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mx-auto navbar-menu'>
            {navLinkItems.map(
              (item) =>
                !item.hide && (
                  <NavLink to={item.url} className='nav-link' key={item.url}>
                    {item.lable}
                  </NavLink>
                ),
            )}
          </Nav>
        </Navbar.Collapse>
        <Stack direction='horizontal' style={{ paddingRight: '1rem' }}>
          {userAvatar?.key ? userAvatar : userLoggedIn ? <LogoutButton /> : <LoginButton />}
        </Stack>
      </Navbar>
    </>
  )
}

export default NavBar
