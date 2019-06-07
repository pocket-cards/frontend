import { Action, ActionFunction3, ActionFunction1, ActionFunction0, ActionFunction2 } from 'redux-actions';
import { History } from 'history';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { IState } from '@models';
import { RequestAction, SuccessAction2, FailureAction2, SuccessAction1 } from 'typings/types';
import {
  A0_01_REQUEST,
  A0_01_SUCCESS,
  A0_01_FAILURE,
  A0_02_REQUEST,
  A0_02_SUCCESS,
  A0_02_FAILURE,
  A0_03_REQUEST,
  A0_03_SUCCESS,
  A0_03_FAILURE,
  A0_04_REQUEST,
  A0_04_SUCCESS,
  A0_04_FAILURE,
} from '@constants/ActionTypes';
import { D001Response } from 'typings/api';

export { default as uploadImage } from './A001';
export { default as removeWord } from './A002';
export { default as registWords } from './A003';
export { default as clear } from './A004';

/** 単語登録画面のActions */
export interface Actions {
  uploadImage: (type: string, image: string, history?: History<any>) => UploadImageAction;

  // 指定単語削除
  removeWord: (word: string) => RemoveWordAction;

  // 単語一括登録
  registWords: (words: string[], history?: History<any>) => RegistWordsAction;

  clear: () => ClearAction;
}

/** 画像アップロード */
export type UploadImageThunkAction = ThunkAction<Promise<void>, IState, AxiosInstance, Action<A001Actions>>;
export type UploadImageAction = ActionFunction3<string, string, History<any>, UploadImageThunkAction>;
/** 単語削除 */
export type RemoveWordThunkAction = ThunkAction<void, IState, AxiosInstance, Action<A002Actions>>;
export type RemoveWordAction = ActionFunction1<string, RemoveWordThunkAction>;
/** 単語登録 */
export type RegistWordsThunkAction = ThunkAction<Promise<void>, IState, AxiosInstance, Action<A003Actions>>;
export type RegistWordsAction = ActionFunction2<string[], History<any>, RegistWordsThunkAction>;
/** 単語登録 */
export type ClearThunkAction = ThunkAction<void, IState, AxiosInstance, Action<A004Actions>>;
export type ClearAction = ActionFunction0<ClearThunkAction>;

/** 画像アップロード */
export type A001_SUCCESS_PAYLOAD = D001Response;
export type A001RequestBaseAction = RequestAction<typeof A0_01_REQUEST>;
export type A001SuccessBaseAction = SuccessAction2<typeof A0_01_SUCCESS, A001_SUCCESS_PAYLOAD>;
export type A001FailureBaseAction = FailureAction2<typeof A0_01_FAILURE, Error>;
export type A001RequestAction = ThunkAction<A001RequestBaseAction, IState, AxiosInstance, A001RequestBaseAction>;
export type A001SuccessAction = ActionFunction1<D001Response, ThunkAction<A001SuccessBaseAction, IState, AxiosInstance, A001SuccessBaseAction>>;
export type A001FailureAction = ActionFunction1<Error, ThunkAction<A001FailureBaseAction, IState, AxiosInstance, A001FailureBaseAction>>;

export type A001Actions = A001RequestAction | A001SuccessAction | A001FailureAction;

/** 単語削除 */
export type A002_SUCCESS_PAYLOAD = {
  word: string;
};

export type A002RequestBaseAction = RequestAction<typeof A0_02_REQUEST>;
export type A002SuccessBaseAction = SuccessAction2<typeof A0_02_SUCCESS, A002_SUCCESS_PAYLOAD>;
export type A002FailureBaseAction = FailureAction2<typeof A0_02_FAILURE, Error>;
export type A002RequestAction = ThunkAction<A002RequestBaseAction, IState, AxiosInstance, A002RequestBaseAction>;
export type A002SuccessAction = ActionFunction1<string, ThunkAction<A002SuccessBaseAction, IState, AxiosInstance, A002SuccessBaseAction>>;
export type A002FailureAction = ActionFunction1<Error, ThunkAction<A002FailureBaseAction, IState, AxiosInstance, A002FailureBaseAction>>;

export type A002Actions = A002RequestAction | A002SuccessAction | A002FailureAction;

/** 単語登録 */
export type A003RequestBaseAction = RequestAction<typeof A0_03_REQUEST>;
export type A003SuccessBaseAction = SuccessAction1<typeof A0_03_SUCCESS>;
export type A003FailureBaseAction = FailureAction2<typeof A0_03_FAILURE, Error>;
export type A003RequestAction = ThunkAction<A003RequestBaseAction, IState, AxiosInstance, A003RequestBaseAction>;
export type A003SuccessAction = ActionFunction0<ThunkAction<A003SuccessBaseAction, IState, AxiosInstance, A003SuccessBaseAction>>;
export type A003FailureAction = ActionFunction1<Error, ThunkAction<A003FailureBaseAction, IState, AxiosInstance, A003FailureBaseAction>>;

export type A003Actions = A003RequestAction | A003SuccessAction | A003FailureAction;

/** 単語クリア */
export type A004RequestBaseAction = RequestAction<typeof A0_04_REQUEST>;
export type A004SuccessBaseAction = SuccessAction1<typeof A0_04_SUCCESS>;
export type A004FailureBaseAction = FailureAction2<typeof A0_04_FAILURE, Error>;
export type A004RequestAction = ThunkAction<A004RequestBaseAction, IState, AxiosInstance, A004RequestBaseAction>;
export type A004SuccessAction = ThunkAction<A004SuccessBaseAction, IState, AxiosInstance, A004SuccessBaseAction>;
export type A004FailureAction = ActionFunction1<Error, ThunkAction<A004FailureBaseAction, IState, AxiosInstance, A004FailureBaseAction>>;

export type A004Actions = A004RequestAction | A004SuccessAction | A004FailureAction;
