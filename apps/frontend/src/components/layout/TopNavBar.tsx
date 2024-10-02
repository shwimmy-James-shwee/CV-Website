// import defautLogo from '../../assets/images/logo.png';
// import '../_nav.scss';
// import { NavLink } from 'react-router-dom';
// import Button from '@mui/material/Button';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

export interface navLinkItemProps {
  label: string;
  url: string;
  hide?: boolean;
}
// interface NavBarProps {
//   handleLogin: () => void;
//   handleLogout: () => void;
//   navLogo?: string;
//   userLoggedIn: boolean;
//   userAvatar?: JSX.Element;
//   navLinkItems: navLinkItemProps[];
// }

function NavBar({ navLinkItems }: { navLinkItems: navLinkItemProps[] }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    // TODO update
    event.stopPropagation();
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            James Pearce
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navLinkItems.map((item) => (
                <MenuItem disabled={item.hide} key={item.label} onClick={(e) => handleCloseNavMenu(e)}>
                  <Typography sx={{ textAlign: 'center' }}>{item.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant='h5'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            James Pearce
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinkItems.map((item) => (
              <Button
                key={item.label}
                disabled={item.hide}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
// export interface navLinkItemProps {
//   lable: string;
//   url: string;
//   hide?: boolean;
// }
// interface NavBarProps {
//   handleLogin: () => void;
//   handleLogout: () => void;
//   navLogo?: string;
//   userLoggedIn: boolean;
//   userAvatar?: JSX.Element;
//   navLinkItems: navLinkItemProps[];
// }

// function NavBar({ handleLogin, handleLogout, navLogo, userLoggedIn, userAvatar, navLinkItems }: NavBarProps) {
//   function NavBar({ handleLogin, handleLogout, navLogo, userLoggedIn, userAvatar, navLinkItems }: NavBarProps) {
//   // const LoginButton = () => {
//   //   return (
//   //     <Button size='small' onClick={handleLogin}>
//   //       Login
//   //     </Button>
//   //   );
//   // };

//   // const LogoutButton = () => {
//   //   return (
//   //     <Button size='small' onClick={handleLogout}>
//   //       Log out
//   //     </Button>
//   //   );
//   // };

//   return (
//     <>
//       <Navbar data-testid='nav-bar' className='navbar'>
//         <Navbar.Brand href='/' className='me-0' style={{ width: '0px' }}>
//           <img alt='' src={navLogo || defautLogo} height='28' className='ps-2 d-inline-block align-top' />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls='basic-navbar-nav' />
//         <Navbar.Collapse id='basic-navbar-nav'>
//           <Nav className='mx-auto navbar-menu'>
//             {navLinkItems.map(
//               (item) =>
//                 !item.hide && (
//                   <NavLink to={item.url} className='nav-link' key={item.url}>
//                     {item.lable}
//                   </NavLink>
//                 ),
//             )}
//           </Nav>
//         </Navbar.Collapse>
//         <Stack direction='horizontal' style={{ paddingRight: '1rem' }}>
//           {userAvatar?.key ? userAvatar : userLoggedIn ? <LogoutButton /> : <LoginButton />}
//         </Stack>
//       </Navbar>
//     </>
//   );
// }

// export default NavBar;