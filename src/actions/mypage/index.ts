import { Action, ActionFunction1, ActionFunction0 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';
import { RequestAction, SuccessAction2, FailureAction2, APIClass } from 'typings/types';
import { A002Response } from 'typings/api';
import { C0_01_REQUEST, C0_01_SUCCESS, C0_01_FAILURE } from '@constants/ActionTypes';

export { default as history } from './C001';
// export { default as removeWord } from './A002';
// export { default as registWords } from './A003';
// export { default as clear } from './A004';

/** 個人画面のActions */
export interface Actions {
  /** 学習履歴取得 */
  history(): HistoryAction;

  // 指定単語削除
  // removeWord: (word: string) => RemoveWordAction;

  // // 単語一括登録
  // registWords: (words: string[], history?: History<any>) => RegistWordsAction;

  // clear: () => ClearAction;
}

/** 学習履歴取得 */
export type HistoryThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<C001Actions>>;
export type HistoryAction = ActionFunction0<HistoryThunkAction>;

/** 画像アップロード */
export type C001_SUCCESS_PAYLOAD = A002Response;
export type C001RequestBaseAction = RequestAction<typeof C0_01_REQUEST>;
export type C001SuccessBaseAction = SuccessAction2<typeof C0_01_SUCCESS, C001_SUCCESS_PAYLOAD>;
export type C001FailureBaseAction = FailureAction2<typeof C0_01_FAILURE, Error>;
export type C001RequestAction = ThunkAction<C001RequestBaseAction, IState, APIClass, C001RequestBaseAction>;
export type C001SuccessAction = ActionFunction1<A002Response, ThunkAction<C001SuccessBaseAction, IState, APIClass, C001SuccessBaseAction>>;
export type C001FailureAction = ActionFunction1<Error, ThunkAction<C001FailureBaseAction, IState, APIClass, C001FailureBaseAction>>;

export type C001Actions = C001RequestAction | C001SuccessAction | C001FailureAction;
