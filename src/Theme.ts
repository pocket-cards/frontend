import { Theme, createMuiTheme } from '@material-ui/core';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#482880',
      main: '#673ab7',
      light: '#8561c5',
    },
    secondary: {
      dark: '#115293',
      main: '#1976d2',
      light: '#4791db',
    },
  },
});

export default theme;
