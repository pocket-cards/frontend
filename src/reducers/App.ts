import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { ActionTypes } from '@constants';
import { App01Payload, App04Payload, App07Payload, App09Payload, App08Payload, App06Payload } from '@actions/app';
import { App10Payload } from '@actions/app/Actions';

const reducer = handleActions<App, any>(
  {
    /** タブ変更 */
    [ActionTypes.APP_01_REQUEST]: (store: App) => store,
    [ActionTypes.APP_01_SUCCESS]: (store: App, { payload: { index } }: Action<App01Payload>) => store.tabChange(index),
    [ActionTypes.APP_01_FAILURE]: (store: App) => store,

    /** ユーザ情報設定 */
    [ActionTypes.APP_04_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_04_SUCCESS]: (store: App, { payload }: Action<App04Payload>) =>
      store.loggedIn(payload.user).endLoading(),
    [ActionTypes.APP_04_FAILURE]: (store: App) => store.endLoading(),

    /** ログアウト */
    [ActionTypes.APP_05_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_05_SUCCESS]: (store: App) => store.logout(),
    [ActionTypes.APP_05_FAILURE]: (store: App) => store.endLoading(),

    /** サーバ関連 */
    [ActionTypes.APP_06_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_06_SUCCESS]: (store: App, { payload }: Action<App06Payload>) =>
      store.updateStatus(payload.status).endLoading(),
    [ActionTypes.APP_06_FAILURE]: (store: App) => store.endLoading(),

    [ActionTypes.APP_07_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_07_SUCCESS]: (store: App, { payload }: Action<App07Payload>) =>
      store.updateStatus(payload.status).endLoading(),
    [ActionTypes.APP_07_FAILURE]: (store: App) => store.endLoading(),

    [ActionTypes.APP_08_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.APP_08_SUCCESS]: (store: App, { payload }: Action<App08Payload>) =>
      store.updateStatus(payload.status).endLoading(),
    [ActionTypes.APP_08_FAILURE]: (store: App) => store.endLoading(),

    /** グループ選択 */
    [ActionTypes.APP_09_REQUEST]: (store: App) => store,
    [ActionTypes.APP_09_SUCCESS]: (store: App, { payload }: Action<App09Payload>) => store.setGroupId(payload.groupId),
    [ActionTypes.APP_09_FAILURE]: (store: App) => store,

    /** 画面表示制御 */
    [ActionTypes.APP_10_REQUEST]: (store: App) => store,
    [ActionTypes.APP_10_SUCCESS]: (store: App, { payload }: Action<App10Payload>) => store.setShow(payload),
    [ActionTypes.APP_10_FAILURE]: (store: App) => store,
  },
  new App()
);

export default reducer;
