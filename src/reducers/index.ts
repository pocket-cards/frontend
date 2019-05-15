import { combineReducers } from 'redux-immutable';
import app from './app';
import A000 from './A000';
import B000 from './B000';

export default combineReducers({
  app,
  A000,
  B000,
});
