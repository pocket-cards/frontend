import { Loading, Nothing } from '@actions/com';
import { createAction, Action, ActionFunction1, ActionFunction0 } from 'redux-actions';
import { ActionTypes } from '@constants';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';
import { D001Response } from 'typings/api';
import { CallHistoryMethodAction } from 'connected-react-router';

/** 画像アップロード */
export const UploadImage = {
  request: Loading.request,
  success: createAction(ActionTypes.A0_01_SUCCESS, (data: D001Response) => ({ data })),
  failure: Loading.failure,
};

/** 指定単語削除 */
export const RemoveWord = {
  request: Nothing.request,
  success: createAction(ActionTypes.A0_02_SUCCESS, (word: string) => ({ word })),
  failure: createAction(ActionTypes.A0_02_FAILURE, (error: Error) => ({ error })),
};

/** 単語登録 */
export const RegistWords = {
  request: Loading.request,
  success: createAction(ActionTypes.A0_03_SUCCESS),
  failure: Loading.failure,
};

/** 単語クリア */
export const Clear = {
  request: Nothing.request,
  success: createAction(ActionTypes.A0_04_SUCCESS),
  failure: Nothing.failure,
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
