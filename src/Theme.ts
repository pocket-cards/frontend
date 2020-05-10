import { Theme, createMuiTheme } from '@material-ui/core';

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
      dark: '#8e0000',
      main: '#c62828',
      light: '#ff5f52',
    },
  },
});

export default theme;
