import { Theme, createMuiTheme } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';

const theme: Theme = createMuiTheme({
  palette: {
    // primary: {
    //   dark: '#482880',
    //   main: '#673ab7',
    //   light: '#8561c5',
    // },
    // secondary: {
    //   dark: '#560027',
    //   main: '#880e4f',
    //   light: '#bc477b',
    // },
    primary: {
      dark: '#003c8f',
      main: '#1565c0',
      light: '#5e92f3',
    },
    secondary: {
      // dark: '#8e0000',
      // main: '#c62828',
      // light: '#ff5f52',
      // dark: '#ffb74d',
      // main: '#ffcc80',
      // light: '#ffe0b2',
      dark: orange.A700,
      main: orange.A400,
      light: orange.A200,
    },
  },
});

export default theme;
