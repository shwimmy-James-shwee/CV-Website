import { createTheme } from '@mui/material';

// add custom theme var
declare module '@mui//material/styles' {
  interface Theme {
    imageContrast: {
      primary: string;
      secondary: string;
    };

    additionalColors: {
      contrastBackground: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    imageContrast?: {
      primary?: string;
      secondary?: string;
    };

    additionalColors?: {
      contrastBackground?: string;
    };
  }
}

export const darkTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          // VIVID ACCENT COLORS
          main: '#d18800', // primary accent color
          light: '#000000', // not applied to any components currently in use
          dark: '#000000', // some buttons use this for hover background
          contrastText: '#ffffff', // some buttons use this for both default and hover text (can force style)
        },
        secondary: {
          // SUBTLE HIGHLIGHT COLORS
          main: '#272727', // secondary accent color
          light: '#272727', // not applied to any components currently in use
          dark: '#2e2e2e', // not applied to any components currently in use
          contrastText: '#ffffff', // not applied to any components currently in use
        },
        background: {
          default: '#131313', // not applied to any components currently in use
          paper: '#d18800', // several MUI element background
        },
        text: {
          primary: '#ffffff', // used by the majority of text elements
          secondary: '#ffffff', // not applied to any components currently in use
          disabled: '#ffffff',
        },
      },
    },
  },
  imageContrast: {
    primary: 'contrast(1.2)',
    secondary: 'contrast(90%)',
  },
  additionalColors: {
    contrastBackground: '#dcdbdb',
  },
});
export const lightTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#bbc619',
          light: '#ffffff',
          dark: '#ffffff',
          contrastText: '#000000',
        },
        secondary: {
          main: '#ebebeb',
          light: '#eaeaea',
          dark: '#d3d3d3',
          contrastText: '#000000',
        },
        background: {
          default: '#FFFAF1',
          paper: '#bbc619',
        },
        text: {
          primary: '#000000',
          secondary: '#000000',
          disabled: '#000000',
        },
      },
    },
  },
  imageContrast: {
    // primary: 'brightness(0.9) contrast(2)',
    // secondary: 'grayscale(100%)',
    primary: 'contrast(1.2)',
    secondary: 'contrast(90%)',
  },
  additionalColors: {
    contrastBackground: '#dcdbdb',
  },
});
