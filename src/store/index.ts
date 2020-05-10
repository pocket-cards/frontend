import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router/immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import * as API from '@utils/API';

export const history = createBrowserHistory();

const store = createStore(
  rootReducer(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), thunk.withExtraArgument(API), logger)
    // other store enhancers if any
  )
);

if (module.hot) {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').default));
}

export default store;
