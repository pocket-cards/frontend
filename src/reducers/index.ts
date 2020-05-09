import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import { History } from 'history';
import App from './App';
import A000 from './A000';
import B000 from './B000';
import C000 from './C000';
import E000 from './E000';

export default (history: History<History.PoorMansUnknown>) =>
  combineReducers({
    router: connectRouter(history),
    app: App,
    a000: A000,
    b000: B000,
    c000: C000,
    e000: E000,
  });
