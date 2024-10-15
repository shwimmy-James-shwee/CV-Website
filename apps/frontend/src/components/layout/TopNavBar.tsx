// import defautLogo from '../../assets/images/logo.png';
// import '../_nav.scss';
// import { NavLink } from 'react-router-dom';
// import Button from '@mui/material/Button';

import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import AdbIcon from '@mui/icons-material/Adb';
import { styled } from '@mui/system';

export interface navLinkItemProps {
  label: string;
  url: string;
  hide?: boolean;
}

const StyledNavBar = styled(AppBar)`
  background-color: var(--mui-palette-secondary-main) !important;
`;

const WideScreenNavBox = styled(Box)`
  /* display: flex; */ // applied through SX below
  flex-grow: 1;
  justify-content: space-evenly;
  width: 80%;
`;

type NavBarProps = {
  navLinkItems: navLinkItemProps[];
  changeTheme: () => void;
  pageTheme: 'light' | 'dark';
};
// interface NavBarProps {
//   handleLogin: () => void;
//   handleLogout: () => void;
//   navLogo?: string;
//   userLoggedIn: boolean;
//   userAvatar?: JSX.Element;
//   navLinkItems: navLinkItemProps[];
// }

function NavBar({ navLinkItems, changeTheme, pageTheme }: NavBarProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  // const { mode, setMode, systemMode } = useColorScheme();
  // if (!mode) {
  //   // setMode('light');
  //   return null; // is undefined on first render, won't be after that
  // }
  // console.log(mode);
  // const toggleTheme = () => {
  //   const theme = mode === 'light' ? 'dark' : 'light';
  //   setMode(theme);
  //   setTheme(theme);
  // };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
    // TODO update
    event.stopPropagation();
  };

  return (
    <StyledNavBar position='static'>
      <Container maxWidth='lg'>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              // color: 'inherit',
              textDecoration: 'none',
            }}
          >
            James Pearce
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* MOBILE VIEW */}
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              // color='inherit'
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
              <MenuItem>
                <Typography onClick={changeTheme} sx={{ textAlign: 'center' }}>
                  {pageTheme === 'dark' ? 'light' : 'dark'}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
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

          {/* DESKTOP VIEW */}
          <WideScreenNavBox sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinkItems.map((item) => (
              <MenuItem
                key={item.label}
                disabled={item.hide}
                onClick={handleCloseNavMenu}
                // sx={{ my: 2, display: 'block' }}
                color='primary'
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={changeTheme} sx={{ my: 2, display: 'block' }}>
              {pageTheme === 'dark' ? 'light' : 'dark'}
            </MenuItem>
          </WideScreenNavBox>
        </Toolbar>
      </Container>
    </StyledNavBar>
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
