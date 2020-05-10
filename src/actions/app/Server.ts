import { createAction, ActionFunction0, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, Consts } from '@constants';
import { Loading } from '@actions/com';
import { State } from '@models';
import { ErrorPayload, APIClass } from 'typings/types';

/** サーバー開始 */
const start: ServerStartAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    await api.post(Consts.SERVER_START_URL(), {});

    dispatch(createAction(ActionTypes.APP_06_SUCCESS));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

/** サーバー停止 */
const stop: ServerStopAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    // サーバ停止
    await api.post(Consts.SERVER_STOP_URL());

    dispatch(createAction(ActionTypes.APP_07_SUCCESS));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

/** サーバー停止 */
const status: ServerStatusAction = () => async (dispatch, _, api) => {
  dispatch(Loading.request);

  try {
    // サーバ停止
    await api.post(Consts.SERVER_STATUS_URL());

    dispatch(createAction(ActionTypes.APP_08_SUCCESS));
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
