import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { APP_01_REQUEST, APP_01_SUCCESS, APP_01_FAILURE } from '@constants/ActionTypes';
import { App01Payload } from '@actions/app';

const reducer = handleActions<App, any>(
  {
    /** タブ変更 */
    [APP_01_REQUEST]: (store: App) => store,
    [APP_01_SUCCESS]: (store: App, { payload: { index } }: Action<App01Payload>) => store.tabChange(index),
    [APP_01_FAILURE]: (store: App) => store,
  },
  new App(),
);

export default reducer;
