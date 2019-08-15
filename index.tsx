import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import store from './src/store';
import Router from './src/Router';
import { register } from './src/serviceWorker';
import theme from './src/Theme';
import { MuiThemeProvider } from '@material-ui/core';
import Amplify, { API, Auth, Analytics } from 'aws-amplify';
import { API_NAME, API_URL, VERSION } from '@constants/Consts';

// 分析禁止
Analytics.disable();

console.log(process.env);

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: process.env.IDENTITY_POOL_ID,

    // REQUIRED - Amazon Cognito Region
    region: process.env.AWS_DEFAULT_REGION,

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: process.env.USER_POOL_ID,

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: '.localhost',
    //   // OPTIONAL - Cookie path
    //   path: '/',
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true,
    // },
  },
  API: {
    endpoints: [
      {
        name: API_NAME,
        endpoint: API_URL,
        region: process.env.AWS_DEFAULT_REGION,
      },
    ],
  },
});

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

  // const result = await Auth.confirmSignUp('wwalpha', '215225');

  await Auth.signIn({
    username: 'wwalpha',
    password: 'session10',
  });

  const res = await API.get(API_NAME, '/', {});

  console.log(res);
  if (res && res.version !== VERSION) {
    window.location.reload(true);
    return;
  }

  render(provider, root);

  register();
};

start();
