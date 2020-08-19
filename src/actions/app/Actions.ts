import { createAction, Action, ActionFunction1, ActionFunction0, ActionFunction2 } from 'redux-actions';
import { ActionTypes } from '@constants';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';
import { CognitoUser } from '@aws-amplify/auth';

export const request = (actionType: string): ActionFunction0<Action<any>> => createAction(actionType);

export const failure = (actionType: string): ActionFunction1<Error, Action<ErrorPayload>> =>
  createAction(actionType, (error: Error) => ({ error }));

export const TabChange = {
  request: request(ActionTypes.APP_01_REQUEST),
  success: createAction(ActionTypes.APP_01_SUCCESS, (index: number): App01Payload => ({ index })),
  failure: failure(ActionTypes.APP_01_FAILURE),
};

/** ログイン状態変更 */
export const LoggedIn = {
  request: request(ActionTypes.APP_04_REQUEST),
  success: createAction(ActionTypes.APP_04_SUCCESS, (user: CognitoUser): App04Payload => ({ user })),
  failure: failure(ActionTypes.APP_04_FAILURE),
};

/** ログアウト */
export const Logout = {
  request: request(ActionTypes.APP_05_REQUEST),
  success: createAction(ActionTypes.APP_05_SUCCESS),
  failure: failure(ActionTypes.APP_05_FAILURE),
};

/** グループ選択 */
export const GroupSelect = {
  request: request(ActionTypes.APP_09_REQUEST),
  success: createAction(
    ActionTypes.APP_09_SUCCESS,
    (groupId: string): App09Payload => ({
      groupId,
    })
  ),
  failure: failure(ActionTypes.APP_09_FAILURE),
};

/** サーバ開始 */
export const Start = {
  request: request(ActionTypes.APP_06_REQUEST),
  success: createAction(
    ActionTypes.APP_06_SUCCESS,
    (status: string): App06Payload => ({
      status,
    })
  ),
  failure: failure(ActionTypes.APP_06_FAILURE),
};

/** サーバ終了 */
export const Stop = {
  request: request(ActionTypes.APP_07_REQUEST),
  success: createAction(
    ActionTypes.APP_07_SUCCESS,
    (status: string): App07Payload => ({
      status,
    })
  ),
  failure: failure(ActionTypes.APP_07_FAILURE),
};

/** サーバステータス */
export const Status = {
  request: request(ActionTypes.APP_08_REQUEST),
  success: createAction(
    ActionTypes.APP_08_SUCCESS,
    (status: string): App08Payload => ({
      status,
    })
  ),
  failure: failure(ActionTypes.APP_08_FAILURE),
};

/** サーバステータス */
export const Show = {
  request: request(ActionTypes.APP_10_REQUEST),
  success: createAction(
    ActionTypes.APP_10_SUCCESS,
    (type: number, value: boolean): App10Payload => ({
      type,
      value,
    })
  ),
  failure: failure(ActionTypes.APP_10_FAILURE),
};

/** Tab Change */
export interface App01Payload {
  index: number;
}

type TabChangePayload = App01Payload | ErrorPayload;
type TabChangeThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<TabChangePayload>>;
export type TabChangeAction = ActionFunction1<number, TabChangeThunkAction>;

/** ログイン状態変更 */
export interface App04Payload {
  user: CognitoUser;
}

type LoggedInPayload = App04Payload | ErrorPayload;
type LoggedInActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<LoggedInPayload>>;
export type LoggedInAction = ActionFunction1<CognitoUser, LoggedInActionThunkAction>;

/** ログアウト */
type LogoutPayload = ErrorPayload;
type LogoutActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<LogoutPayload>>;
export type LogoutAction = ActionFunction0<LogoutActionThunkAction>;

/** サーバ開始 */
export interface App06Payload {
  status: string;
}

type ServerStartPayload = ErrorPayload | App06Payload;
type ServerStartActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStartPayload>>;
export type ServerStartAction = ActionFunction0<ServerStartActionThunkAction>;

/** サーバ終了 */
export interface App07Payload {
  status: string;
}

type ServerStopPayload = App07Payload | ErrorPayload;
type ServerStopActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStopPayload>>;
export type ServerStopAction = ActionFunction0<ServerStopActionThunkAction>;

/** サーバステータス */
export interface App08Payload {
  status: string;
}

type ServerStatusPayload = ErrorPayload | App08Payload;
type ServerStatusActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStatusPayload>>;
export type ServerStatusAction = ActionFunction0<ServerStatusActionThunkAction>;

/** グループ選択 */
export interface App09Payload {
  groupId: string;
}

type GroupSelectPayload = ErrorPayload | App09Payload;
type GroupSelectActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<GroupSelectPayload>>;
export type GroupSelectAction = ActionFunction1<string, GroupSelectActionThunkAction>;

/** 表示フラグ制御 */
export interface App10Payload {
  type: number;
  value: boolean;
}

type ShowPayload = ErrorPayload | App10Payload;
type ShowActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ShowPayload>>;
export type ShowAction = ActionFunction2<number, boolean, ShowActionThunkAction>;
