import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './src/store';
import Router from './src/Router';
import { register } from './src/serviceWorker';
import theme from './src/Theme';
import { MuiThemeProvider } from '@material-ui/core';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';

// Amplify.configure({
//   Auth: {
//     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//     identityPoolId: 'ap-northeast-1:5b91c1fa-001a-479c-b57a-a91fac2520b6',

//     // REQUIRED - Amazon Cognito Region
//     region: 'ap-northeast-1',

//     // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolId: 'ap-northeast-1_wddt9qPuu',

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     userPoolWebClientId: '3b0igerc2rmbqnfa50uf649rap',

//     // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//     mandatorySignIn: false,

//     // OPTIONAL - Configuration for cookie storage
//     // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//     cookieStorage: {
//       // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//       domain: '.aws-handson.com',
//       // OPTIONAL - Cookie path
//       path: '/',
//       // OPTIONAL - Cookie expiration in days
//       expires: 365,
//       // OPTIONAL - Cookie secure flag
//       // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//       secure: true,
//     },
//   },
// });

const provider = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
);

const root = document.getElementById('root');

const start = async () => {
  // const result = await Auth.signUp({
  //   username: 'wwalpha',
  //   password: 'session10',
  //   attributes: {
  //     email: 'wwalpha@gmail.com',
  //   },
  // });

  // const result = await Auth.confirmSignUp('wwalpha', '944880');

  // const result = await Auth.signIn({
  //   username: 'wwalpha',
  //   password: 'session10',
  // });

  // console.log(result);
  // After retrieving the confirmation code from the user
  // Auth.confirmSignUp(username, code, {
  //   // Optional. Force user confirmation irrespective of existing alias. By default set to True.
  //   forceAliasCreation: true,
  // })
  //   .then(data => console.log(data))
  //   .catch(err => console.log(err));

  // Auth.resendSignUp(username)
  //   .then(() => {
  //     console.log('code resent successfully');
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });

  // await Auth.signIn({
  //   username: 'wwalpha',
  //   password:
  // })
  render(provider, root);

  register();
};

start();
