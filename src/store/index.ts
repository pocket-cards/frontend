import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware as api } from 'redux-api-middleware';
import logger from 'redux-logger';
import rootReducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(api, logger)(createStore);

const store = (initialState?: any) => createStoreWithMiddleware(rootReducer, initialState);

export default store;
