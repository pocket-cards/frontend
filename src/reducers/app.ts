import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { TabChangePayload } from '@actions/app';
import { APP_TAB_CHANGE } from '@constants/ActionTypes';

const app = handleActions(
  {
    [APP_TAB_CHANGE]: (store: App, action: Action<TabChangePayload>) => store.tabChange(action.payload.index),

  },
  new App());

export default app;
