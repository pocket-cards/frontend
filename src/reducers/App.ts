import { handleActions, Action } from 'redux-actions';
import { App } from '@models';
import { ActionTypes } from '@constants';
import { App01Payload, App02Payload, App03Payload, App04Payload, App09Payload } from '@actions/app';

const reducer = handleActions<App, any>(
  {
    [ActionTypes.COM_01_REQUEST]: (store: App) => store.startLoading(),
    [ActionTypes.COM_01_FAILURE]: (store: App) => store.endLoading(),

    [ActionTypes.COM_02_REQUEST]: (store: App) => store,
    [ActionTypes.COM_02_FAILURE]: (store: App) => store,

    /** タブ変更 */
    [ActionTypes.APP_01_SUCCESS]: (store: App, { payload: { index } }: Action<App01Payload>) => store.tabChange(index),

    /** ヘッダ表示 */
    [ActionTypes.APP_02_SUCCESS]: (store: App, { payload: { visible } }: Action<App02Payload>) =>
      store.setShowHeader(visible),

    /** Footer表示 */
    [ActionTypes.APP_03_SUCCESS]: (store: App, { payload: { visible } }: Action<App03Payload>) =>
      store.setShowFooter(visible),

    /** ユーザ情報設定 */
    [ActionTypes.APP_04_SUCCESS]: (store: App, { payload: { user } }: Action<App04Payload>) =>
      store.loggedIn(user).endLoading(),

    /** ログアウト */
    [ActionTypes.APP_05_SUCCESS]: (store: App) => store.logout(),

    /** サーバ関連 */
    [ActionTypes.APP_06_SUCCESS]: (store: App) => store.endLoading(),
    [ActionTypes.APP_07_SUCCESS]: (store: App) => store.endLoading(),
    [ActionTypes.APP_08_SUCCESS]: (store: App) => store.endLoading(),

    /** グループ選択 */
    [ActionTypes.APP_09_SUCCESS]: (store: App, { payload: { groupId } }: Action<App09Payload>) =>
      store.setGroupId(groupId),
  },
  new App()
);

export default reducer;
