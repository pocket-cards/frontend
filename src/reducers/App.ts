import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import {
  APP_01_REQUEST,
  APP_01_SUCCESS,
  APP_01_FAILURE,
  APP_02_REQUEST,
  APP_02_SUCCESS,
  APP_02_FAILURE,
  APP_03_REQUEST,
  APP_03_SUCCESS,
  APP_03_FAILURE,
  APP_04_REQUEST,
  APP_04_SUCCESS,
  APP_04_FAILURE,
} from '@constants/ActionTypes';
import { App01Payload, App02Payload, App03Payload, App04Payload } from '@actions/app';

const reducer = handleActions<App, any>(
  {
    /** タブ変更 */
    [APP_01_REQUEST]: (store: App) => store,
    [APP_01_SUCCESS]: (store: App, { payload: { index } }: Action<App01Payload>) => store.tabChange(index),
    [APP_01_FAILURE]: (store: App) => store,

    /** ヘッダ表示 */
    [APP_02_REQUEST]: (store: App) => store,
    [APP_02_SUCCESS]: (store: App, { payload: { visible } }: Action<App02Payload>) => store.setShowHeader(visible),
    [APP_02_FAILURE]: (store: App) => store,

    /** Footer表示 */
    [APP_03_REQUEST]: (store: App) => store,
    [APP_03_SUCCESS]: (store: App, { payload: { visible } }: Action<App03Payload>) => store.setShowFooter(visible),
    [APP_03_FAILURE]: (store: App) => store,

    [APP_04_REQUEST]: (store: App) => store,
    [APP_04_SUCCESS]: (store: App, { payload: { loggedin } }: Action<App04Payload>) => store.setLoggedIn(loggedin),
    [APP_04_FAILURE]: (store: App) => store,
  },
  new App(),
);

export default reducer;
