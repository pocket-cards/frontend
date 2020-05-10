import {
  TabChange,
  ShowHeader,
  ShowFooter,
  TabChangeAction,
  ShowHeaderAction,
  ShowFooterAction,
  LoggedInAction,
  LoggedIn,
  LogoutAction,
  Logout,
  GroupSelectAction,
  GroupSelect,
  ServerStopAction,
  ServerStartAction,
  ServerStatusAction,
  Status,
  Stop,
  Start,
} from './Actions';
import { Consts } from '@constants';

/** タブ変更 */
export const tabChange: TabChangeAction = (index: number) => async (dispatch, _, api) => {
  dispatch(TabChange.request());

  try {
    // データ保存
    dispatch(TabChange.success(index));
  } catch (err) {
    dispatch(TabChange.failure(err));
  }
};

/** バー表示制御 */
export const showHeader: ShowHeaderAction = (visible) => async (dispatch) => {
  dispatch(ShowHeader.request());

  try {
    // データ保存
    dispatch(ShowHeader.success(visible));
  } catch (err) {
    dispatch(ShowHeader.failure(err));
  }
};

/** バー表示制御 */
export const showFooter: ShowFooterAction = (visible) => async (dispatch) => {
  dispatch(ShowFooter.request());

  try {
    // データ保存
    dispatch(ShowFooter.success(visible));
  } catch (err) {
    dispatch(ShowFooter.failure(err));
  }
};

/** ログイン状態変更 */
export const loggedIn: LoggedInAction = (user) => async (dispatch) => {
  dispatch(LoggedIn.request());

  try {
    // データ保存
    dispatch(LoggedIn.success(user));
  } catch (err) {
    dispatch(LoggedIn.failure(err));
  }
};

/** ログアウト */
export const logout: LogoutAction = () => async (dispatch) => {
  dispatch(Logout.request());

  try {
    // データ保存
    dispatch(Logout.success());
  } catch (err) {
    dispatch(Logout.failure(err));
  }
};

/** グループ選択 */
export const groupSelect: GroupSelectAction = (groupId: string) => async (dispatch, _, api) => {
  dispatch(GroupSelect.request());

  try {
    dispatch(GroupSelect.success(groupId));
  } catch (err) {
    dispatch(GroupSelect.failure(err));
  }
};

/** サーバー開始 */
export const start: ServerStartAction = () => async (dispatch, _, api) => {
  dispatch(Start.request());

  try {
    await api.post(Consts.SERVER_START_URL(), undefined, Consts.API_SERVER_NAME);

    dispatch(Start.success());
  } catch (err) {
    dispatch(Start.failure(err));
  }
};

/** サーバー停止 */
export const stop: ServerStopAction = () => async (dispatch, _, api) => {
  dispatch(Stop.request());

  try {
    // サーバ停止
    await api.post(Consts.SERVER_STOP_URL(), undefined, Consts.API_SERVER_NAME);

    dispatch(Stop.success());
  } catch (err) {
    dispatch(Stop.failure(err));
  }
};

/** サーバーステータス */
export const status: ServerStatusAction = () => async (dispatch, _, api) => {
  dispatch(Status.request());

  try {
    // サーバ停止
    await api.post(Consts.SERVER_STATUS_URL(), undefined, Consts.API_SERVER_NAME);

    dispatch(Status.success());
  } catch (err) {
    dispatch(Status.failure(err));
  }
};
