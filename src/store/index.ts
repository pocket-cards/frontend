import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import * as API from '@utils/API';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(API), logger)
    // other store enhancers if any
  )
);

if (module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
}

export default store;
