import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { ActionTypes } from '@constants';
import { App01Payload, App02Payload, App03Payload, App04Payload } from '@actions/app';

const reducer = handleActions<App, any>(
  {
    /** タブ変更 */
    [ActionTypes.APP_01_REQUEST]: (store: App) => store,
    [ActionTypes.APP_01_SUCCESS]: (store: App, { payload: { index } }: Action<App01Payload>) => store.tabChange(index),
    [ActionTypes.APP_01_FAILURE]: (store: App) => store,

    /** ヘッダ表示 */
    [ActionTypes.APP_02_REQUEST]: (store: App) => store,
    [ActionTypes.APP_02_SUCCESS]: (store: App, { payload: { visible } }: Action<App02Payload>) =>
      store.setShowHeader(visible),
    [ActionTypes.APP_02_FAILURE]: (store: App) => store,

    /** Footer表示 */
    [ActionTypes.APP_03_REQUEST]: (store: App) => store,
    [ActionTypes.APP_03_SUCCESS]: (store: App, { payload: { visible } }: Action<App03Payload>) =>
      store.setShowFooter(visible),
    [ActionTypes.APP_03_FAILURE]: (store: App) => store,

    /** ユーザ情報設定 */
    [ActionTypes.APP_04_REQUEST]: (store: App) => store,
    [ActionTypes.APP_04_SUCCESS]: (store: App, { payload: { user } }: Action<App04Payload>) => store.loggedIn(user),
    [ActionTypes.APP_04_FAILURE]: (store: App) => store,

    /** ログアウト */
    [ActionTypes.APP_05_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_05_SUCCESS]: (store: App) => store.logout(),
    [ActionTypes.APP_05_FAILURE]: (store: App) => store.endLoading(),

    [ActionTypes.COM_01_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.COM_01_FAILURE]: (store: App) => store.endLoading(),
  },
  new App()
);

export default reducer;
