import { Loading, Nothing } from '@actions/com';
import { createAction, Action, ActionFunction1, ActionFunction0 } from 'redux-actions';
import { ActionTypes } from '@constants';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';
import { D001Response } from 'typings/api';
import { CallHistoryMethodAction } from 'connected-react-router';

export const request = (actionType: string): ActionFunction0<Action<any>> => createAction(actionType);

export const failure = (actionType: string): ActionFunction1<Error, Action<ErrorPayload>> =>
  createAction(actionType, (error: Error) => ({ error }));

/** 画像アップロード */
export const UploadImage = {
  request: request(ActionTypes.A0_01_REQUEST),
  success: createAction(ActionTypes.A0_01_SUCCESS, (data: D001Response) => ({ data })),
  failure: failure(ActionTypes.A0_01_FAILURE),
};

/** 指定単語削除 */
export const RemoveWord = {
  request: request(ActionTypes.A0_02_REQUEST),
  success: createAction(ActionTypes.A0_02_SUCCESS, (word: string) => ({ word })),
  failure: failure(ActionTypes.A0_02_FAILURE),
};

/** 単語登録 */
export const RegistWords = {
  request: request(ActionTypes.A0_03_REQUEST),
  success: createAction(ActionTypes.A0_03_SUCCESS),
  failure: failure(ActionTypes.A0_03_FAILURE),
};

/** 単語クリア */
export const Clear = {
  request: request(ActionTypes.A0_04_REQUEST),
  success: createAction(ActionTypes.A0_04_SUCCESS),
  failure: failure(ActionTypes.A0_04_FAILURE),
};

/** 画像アップロード */
export interface A001Payload {
  data: D001Response;
}

type UploadImagePayload = A001Payload | ErrorPayload;
type UploadImageThunkAction = ThunkAction<
  Promise<void>,
  State,
  APIClass,
  Action<UploadImagePayload> | CallHistoryMethodAction
>;
export type UploadImageAction = ActionFunction1<string, UploadImageThunkAction>;

/** 指定単語削除 */
export interface A002Payload {
  word: string;
}

type RemoveWordPayload = A002Payload | ErrorPayload;
type RemoveWordThunkAction = ThunkAction<void, State, APIClass, Action<RemoveWordPayload>>;
export type RemoveWordAction = ActionFunction1<string, RemoveWordThunkAction>;

/** 単語登録 */
export type RegistWordsPayload = ErrorPayload;
export type RegistWordsThunkAction = ThunkAction<
  Promise<void>,
  State,
  APIClass,
  Action<RegistWordsPayload> | CallHistoryMethodAction
>;
export type RegistWordsAction = ActionFunction1<string[], RegistWordsThunkAction>;

/** 単語クリア */
export type ClearPayload = ErrorPayload;
export type ClearThunkAction = ThunkAction<void, State, APIClass, Action<ClearPayload>>;
export type ClearAction = ActionFunction0<ClearThunkAction>;
