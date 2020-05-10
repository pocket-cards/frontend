import { createAction, ActionFunction0, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { APP_06_SUCCESS, APP_07_SUCCESS, APP_08_SUCCESS } from '@constants/ActionTypes';
import { Loading } from '@actions/com';
import { State } from '@models';
import { SERVER_START_URL, SERVER_STATUS_URL, SERVER_STOP_URL } from '@constants/Consts';
import { ErrorPayload, APIClass } from 'typings/types';

/** サーバー開始 */
const start: ServerStartAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    await api.post(SERVER_START_URL());

    dispatch(createAction(APP_06_SUCCESS));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

/** サーバー停止 */
const stop: ServerStopAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    // サーバ停止
    await api.post(SERVER_STOP_URL());

    dispatch(createAction(APP_07_SUCCESS));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

/** サーバー停止 */
const status: ServerStatusAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    // サーバ停止
    await api.post(SERVER_STATUS_URL());

    dispatch(createAction(APP_08_SUCCESS));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

export type ServerStartPayload = ErrorPayload;
export type ServerStartActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStartPayload>>;
export type ServerStartAction = ActionFunction0<ServerStartActionThunkAction>;

export type ServerStopPayload = ErrorPayload;
export type ServerStopActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStopPayload>>;
export type ServerStopAction = ActionFunction0<ServerStopActionThunkAction>;

export type ServerStatusPayload = ErrorPayload;
export type ServerStatusActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStatusPayload>>;
export type ServerStatusAction = ActionFunction0<ServerStatusActionThunkAction>;

export { start, stop, status };
