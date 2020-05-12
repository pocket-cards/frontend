import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { Auth } from '@aws-amplify/auth';
import { API } from '@aws-amplify/api';
import { MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Consts } from '@constants';
import store, { history } from './src/store';
import Router from './src/Router';
import { register } from './src/serviceWorker';
import theme from './src/Theme';

Auth.configure({
  // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  identityPoolId: process.env.IDENTITY_POOL_ID,

  // REQUIRED - Amazon Cognito Region
  region: process.env.AWS_REGION,

  // OPTIONAL - Amazon Cognito User Pool ID
  userPoolId: process.env.USER_POOL_ID,

  // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,

  // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  mandatorySignIn: false,

  oauth: {
    domain: process.env.AUTH_DOMAIN,
    redirectSignIn: process.env.AUTH_SIGN_IN_URL,
    redirectSignOut: process.env.AUTH_SIGN_OUT_URL,
    clientID: process.env.USER_POOL_WEB_CLIENT_ID,
    scope: ['email', 'openid', 'profile'],
    responseType: 'code',
  },
});

API.configure({
  endpoints: [
    {
      name: Consts.API_NAME,
      endpoint: Consts.API_URL,
      region: process.env.AWS_REGION,
      custom_header: async () => {
        return { Authorization: (await Auth.currentSession()).getIdToken().getJwtToken() };
      },
    },
    {
      name: Consts.API_SERVER_NAME,
      endpoint: Consts.API_SERVER_URL,
      region: process.env.AWS_REGION,
      custom_header: async () => {
        return { Authorization: (await Auth.currentSession()).getIdToken().getJwtToken() };
      },
    },
  ],
});

const provider = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>
);

const root = document.getElementById('root');

const start = async () => {
  // const result = await Auth.signUp({
  //   username: 'wwalpha@gmail.com',
  //   password: 'Session10+',
  //   attributes: {
  //     email: 'wwalpha@gmail.com',
  //   },
  // });

  // const result = await Auth.confirmSignUp('wwalpha@gmail.com', '867708');

  // const res = await API.get(API_NAME, '/', {});

  // console.log(res);
  // if (res && res.version !== VERSION) {
  //   window.location.reload(true);
  //   return;
  // }

  render(provider, root);

  // register();
};

start();
