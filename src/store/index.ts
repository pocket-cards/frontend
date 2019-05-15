import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware as api } from 'redux-api-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(api, logger),
    // other store enhancers if any
  ),
);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(require('../reducers').default),
  );
}

export default store;
