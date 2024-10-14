import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#ffffff',
          light: '#000000',
          dark: '#000000',
          contrastText: '#000000',
        },
        secondary: {
          main: '#000000',
          light: '#000000',
          dark: '#000000',
          contrastText: '#ffffff',
        },
        background: {
          default: '#000000',
          paper: '#b4dd13',
        },
        text: {
          primary: '#ffffff',
          secondary: '#ffffff',
          disabled: '#ffffff',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#ffffff',
          light: '#ffffff',
          dark: '#ffffff',
          contrastText: '#000000',
        },
        secondary: {
          main: '#ffffff',
          light: '#ffffff',
          dark: '#ffffff',
          contrastText: '#000000',
        },
        background: {
          default: '#F7FFF7',
          paper: '#F7FFF7',
        },
        text: {
          primary: '#000000',
          secondary: '#000000',
          disabled: '#000000',
        },
      },
    },
  },
});
