import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: '#000000', // used for default navbar text and button background color
          light: '#000000', // not applied to any components currently in use
          dark: '#000000', // some buttons use this for hover background
          contrastText: '#ffffff', // some buttons use this for both default and hover text (can force style)
        },
        secondary: {
          main: '#27272700', // not applied to any components currently in use
          light: '#000000', // not applied to any components currently in use
          dark: '#000000', // not applied to any components currently in use
          contrastText: '#ffffff', // not applied to any components currently in use
        },
        background: {
          default: '#00000000', // not applied to any components currently in use
          paper: '#b4dd13', // several MUI element background
        },
        text: {
          primary: '#ffffff', // used by the majority of text elements
          secondary: '#ffffff', // not applied to any components currently in use
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
