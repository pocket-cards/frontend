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
      dark: '#00b248',
      main: '#00e676',
      light: '#66ffa6',
    },
    text: {
      secondary: '#FFFAFA',
    },
  },
});

export default theme;
