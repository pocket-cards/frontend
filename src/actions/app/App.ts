import {
  TabChange,
  TabChangeAction,
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
  ShowAction,
  Show,
} from './Actions';
import { Consts } from '@constants';
import { Actions } from '@actions/group';

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

/** ログイン状態変更 */
export const loggedIn: LoggedInAction = (user) => async (dispatch) => {
  dispatch(LoggedIn.request());

  try {
    // 画面初期化
    dispatch(status());
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
    const res = await api.post(Consts.SERVER_START_URL(), undefined, Consts.API_SERVER_NAME);

    dispatch(Start.success(res.status));
  } catch (err) {
    dispatch(Start.failure(err));
  }
};

/** サーバー停止 */
export const stop: ServerStopAction = () => async (dispatch, _, api) => {
  dispatch(Stop.request());

  try {
    // サーバ停止
    const res = await api.post(Consts.SERVER_STOP_URL(), undefined, Consts.API_SERVER_NAME);

    dispatch(Stop.success(res.status));
  } catch (err) {
    dispatch(Stop.failure(err));
  }
};

/** サーバーステータス */
export const status: ServerStatusAction = () => async (dispatch, _, api) => {
  dispatch(Status.request());

  try {
    // サーバ停止
    const res = await api.get(Consts.SERVER_STATUS_URL(), undefined, Consts.API_SERVER_NAME);

    if (res.status === Consts.SERVER_STATUS.RUNNING) {
      dispatch(Actions.list());
    }

    dispatch(Status.success(res.status));
  } catch (err) {
    dispatch(Status.failure(err));
  }
};

/** 画面表示制御 */
export const show: ShowAction = (type: number, value: boolean) => async (dispatch) => {
  dispatch(Show.request());

  try {
    dispatch(Show.success(type, value));
  } catch (err) {
    dispatch(Show.failure(err));
  }
};
