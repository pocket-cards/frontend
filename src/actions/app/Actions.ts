import { createAction, Action, ActionFunction1, ActionFunction0 } from 'redux-actions';
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

export const ShowHeader = {
  request: request(ActionTypes.APP_02_REQUEST),
  success: createAction(ActionTypes.APP_02_SUCCESS, (visible: boolean) => ({
    visible,
  })),
  failure: failure(ActionTypes.APP_02_FAILURE),
};

export const ShowFooter = {
  request: request(ActionTypes.APP_03_REQUEST),
  success: createAction(ActionTypes.APP_03_SUCCESS, (visible: boolean) => ({
    visible,
  })),
  failure: failure(ActionTypes.APP_03_FAILURE),
};

/** ログイン状態変更 */
export const LoggedIn = {
  request: request(ActionTypes.APP_04_REQUEST),
  success: createAction(ActionTypes.APP_04_SUCCESS, (user: CognitoUser) => ({ user })),
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
  success: createAction(ActionTypes.APP_09_SUCCESS, (groupId: string) => ({
    groupId,
  })),
  failure: failure(ActionTypes.APP_09_FAILURE),
};

/** サーバ開始 */
export const Start = {
  request: request(ActionTypes.APP_06_REQUEST),
  success: createAction(ActionTypes.APP_06_SUCCESS),
  failure: failure(ActionTypes.APP_06_FAILURE),
};

/** サーバ終了 */
export const Stop = {
  request: request(ActionTypes.APP_07_REQUEST),
  success: createAction(ActionTypes.APP_07_SUCCESS),
  failure: failure(ActionTypes.APP_07_FAILURE),
};

/** サーバステータス */
export const Status = {
  request: request(ActionTypes.APP_08_REQUEST),
  success: createAction(ActionTypes.APP_08_SUCCESS),
  failure: failure(ActionTypes.APP_08_FAILURE),
};

/** Tab Change */
export interface App01Payload {
  index: number;
}

type TabChangePayload = App01Payload | ErrorPayload;
type TabChangeThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<TabChangePayload>>;
export type TabChangeAction = ActionFunction1<number, TabChangeThunkAction>;

/** Hide Bar Header */
export interface App02Payload {
  visible: boolean;
}

type ShowHeaderPayload = App02Payload | ErrorPayload;
type ShowHeaderThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ShowHeaderPayload>>;
export type ShowHeaderAction = ActionFunction1<boolean, ShowHeaderThunkAction>;

/** Hide Bar Header */
export interface App03Payload {
  visible: boolean;
}

type ShowFooterPayload = App03Payload | ErrorPayload;
type ShowFooterThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ShowFooterPayload>>;
export type ShowFooterAction = ActionFunction1<boolean, ShowFooterThunkAction>;

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

/** グループ選択 */
export interface App09Payload {
  groupId: string;
}

type GroupSelectPayload = ErrorPayload | App09Payload;
type GroupSelectActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<GroupSelectPayload>>;
export type GroupSelectAction = ActionFunction1<string, GroupSelectActionThunkAction>;

/** サーバ開始 */
type ServerStartPayload = ErrorPayload;
type ServerStartActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStartPayload>>;
export type ServerStartAction = ActionFunction0<ServerStartActionThunkAction>;

/** サーバ終了 */
type ServerStopPayload = ErrorPayload;
type ServerStopActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStopPayload>>;
export type ServerStopAction = ActionFunction0<ServerStopActionThunkAction>;

/** サーバステータス */
type ServerStatusPayload = ErrorPayload;
type ServerStatusActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ServerStatusPayload>>;
export type ServerStatusAction = ActionFunction0<ServerStatusActionThunkAction>;
