import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import createstore from './src/store';

import App from './src/App';

const store = createstore();
const root = document.getElementById('root');

// Amplify.configure({
//   Auth: {
//     region: 'ap-northeast-1',
//     userPoolId: 'ap-northeast-1_GXUriRkpY',
//     userPoolWebClientId: '4bp5nqfb6kp1ddk0moq4tl23a9',
//   },
// });

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider >,
  root,
);
