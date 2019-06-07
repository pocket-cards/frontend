import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { History } from 'history';
import {
  B0_01_REQUEST,
  B0_01_SUCCESS,
  B0_01_FAILURE,
  B0_04_REQUEST,
  B0_04_SUCCESS,
  B0_04_FAILURE,
  B0_06_REQUEST,
  B0_06_SUCCESS,
  B0_06_FAILURE,
  B0_07_REQUEST,
  B0_07_SUCCESS,
  B0_07_FAILURE,
} from '@constants/ActionTypes';
import { WordInfo, IState } from '@models';
import { MODES } from '@constants/Consts';
import { RequestAction, SuccessAction2, FailureAction2 } from 'typings/types';
import { ActionFunction1, Action, ActionFunction2 } from 'redux-actions';

export { default as startNew } from './B001';
export { default as answer } from './B004';
export { default as startReview } from './B006';
export { default as startTest } from './B007';

/** 次の単語 */
// export const next = (): NextAction => dispatch =>
//   dispatch({
//     type: B0_02_SUCCESS,
//   });

// /** 単語のリトライ */
// export const retry = (): RetryAction => dispatch =>
//   dispatch({
//     type: B0_03_SUCCESS,
//   });

// ------------------------------
// TypeScript Definetion
// ------------------------------
export type MODE = typeof MODES.New | typeof MODES.AllTest | typeof MODES.Review;

export type StartNewAction = ActionFunction1<History<any>, ThunkAction<Promise<void>, any, AxiosInstance, Action<B001Actions>>>;
// export type NextAction = ThunkAction<B002Actions, any, AxiosInstance, B002Actions>;
// export type RetryAction = ThunkAction<B003Actions, any, AxiosInstance, B003Actions>;
export type AnswerAction = ActionFunction2<string, boolean, ThunkAction<Promise<void>, IState, AxiosInstance, Action<B004Actions>>>;
// export type StartNewTestAction = ActionCreator<ThunkAction<Promise<void>, any, AxiosInstance, Action<B005Actions>>>;
export type StartReviewAction = ActionFunction1<History<any>, ThunkAction<Promise<void>, any, AxiosInstance, Action<B006Actions>>>;
export type StartTestAction = ActionFunction1<History<any>, ThunkAction<Promise<void>, any, AxiosInstance, Action<B007Actions>>>;

/** 単語学習画面のActions */
export interface Actions {
  /** 新規単語学習 */
  startNew: (history: History<any>) => void;
  // /** 次の単語 */
  // next: () => NextAction;
  // /** 学習リトライ */
  // retry: () => RetryAction;
  /** テスト回答(YES/NO) */
  answer: (word: string, yes: boolean) => AnswerAction;
  /** 単語テスト（当日）*/
  // startNewTest: (history: History<any>) => StartNewTestAction;
  /** 単語復習 */
  startReview: (history: History<any>) => StartReviewAction;
  /** 単語テスト（全部）*/
  startTest: (history: History<any>) => StartTestAction;
}

/** 新規単語学習 */
export type B001_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B001RequestBaseAction = RequestAction<typeof B0_01_REQUEST>;
export type B001SuccessBaseAction = SuccessAction2<typeof B0_01_SUCCESS, B001_SUCCESS_PAYLOAD>;
export type B001FailureBaseAction = FailureAction2<typeof B0_01_FAILURE>;
export type B001RequestAction = ThunkAction<B001RequestBaseAction, IState, AxiosInstance, B001RequestBaseAction>;
export type B001SuccessAction = ActionFunction1<WordInfo[], ThunkAction<B001SuccessBaseAction, IState, AxiosInstance, B001SuccessBaseAction>>;
export type B001FailureAction = ActionFunction1<Error, ThunkAction<B001FailureBaseAction, IState, AxiosInstance, B001FailureBaseAction>>;

export type B001Actions = B001RequestAction | B001SuccessAction | B001FailureAction;

/** 次の単語 */
// export type B002RequestAction = RequestAction<typeof B0_02_REQUEST>;
// export type B002SuccessAction = SuccessAction1<typeof B0_02_SUCCESS>;
// export type B002FailureAction = FailureAction1<typeof B0_02_FAILURE>;
// export type B002Actions = B002RequestAction | B002SuccessAction | B002FailureAction;

// /** 単語リトライ */
// export type B003RequestAction = RequestAction<typeof B0_03_REQUEST>;
// export type B003SuccessAction = SuccessAction1<typeof B0_03_SUCCESS>;
// export type B003FailureAction = FailureAction1<typeof B0_03_FAILURE>;
// export type B003Actions = B003RequestAction | B003SuccessAction | B003FailureAction;

/** テスト結果(YES/NO) */
export type B004_SUCCESS_PAYLOAD = {
  yes: boolean;
};

export type B004RequestBaseAction = RequestAction<typeof B0_04_REQUEST>;
export type B004SuccessBaseAction = SuccessAction2<typeof B0_04_SUCCESS, B004_SUCCESS_PAYLOAD>;
export type B004FailureBaseAction = FailureAction2<typeof B0_04_FAILURE, Error>;
export type B004RequestAction = ThunkAction<B004RequestBaseAction, IState, AxiosInstance, B004RequestBaseAction>;
export type B004SuccessAction = ActionFunction1<boolean, ThunkAction<B004SuccessBaseAction, IState, AxiosInstance, B004SuccessBaseAction>>;
export type B004FailureAction = ActionFunction1<Error, ThunkAction<B004FailureBaseAction, IState, AxiosInstance, B004FailureBaseAction>>;
export type B004Actions = B004RequestAction | B004SuccessAction | B004FailureAction;

// /** 新規単語テスト開始 */
// export type B005_SUCCESS_PAYLOAD = {
//   mode: string;
//   words: WordInfo[];
// };

// export type B005RequestBaseAction = RequestAction<typeof B0_05_REQUEST>;
// export type B005SuccessBaseAction = SuccessAction2<typeof B0_05_SUCCESS, B005_SUCCESS_PAYLOAD>;
// export type B005FailureBaseAction = FailureAction2<typeof B0_05_FAILURE, Error>;
// export type B005RequestAction = ThunkAction<B005RequestBaseAction, void, AxiosInstance, B005RequestBaseAction>;
// export type B005SuccessAction = ActionCreator<ThunkAction<B005SuccessBaseAction, void, AxiosInstance, B005SuccessBaseAction>>;
// export type B005FailureAction = ActionCreator<ThunkAction<B005FailureBaseAction, void, AxiosInstance, B005FailureBaseAction>>;
// export type B005Actions = B005RequestAction | B005SuccessAction | B005FailureAction;

/** 単語復習開始 */
export type B006_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B006RequestBaseAction = RequestAction<typeof B0_06_REQUEST>;
export type B006SuccessBaseAction = SuccessAction2<typeof B0_06_SUCCESS, B006_SUCCESS_PAYLOAD>;
export type B006FailureBaseAction = FailureAction2<typeof B0_06_FAILURE, Error>;
export type B006RequestAction = ThunkAction<B006RequestBaseAction, void, AxiosInstance, B006RequestBaseAction>;
export type B006SuccessAction = ActionFunction1<WordInfo[], ThunkAction<B006SuccessBaseAction, void, AxiosInstance, B006SuccessBaseAction>>;
export type B006FailureAction = ActionFunction1<Error, ThunkAction<B006FailureBaseAction, void, AxiosInstance, B006FailureBaseAction>>;
export type B006Actions = B006RequestAction | B006SuccessAction | B006FailureAction;

/** 単語テスト（全部） */
export type B007_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B007RequestBaseAction = RequestAction<typeof B0_07_REQUEST>;
export type B007SuccessBaseAction = SuccessAction2<typeof B0_07_SUCCESS, B007_SUCCESS_PAYLOAD>;
export type B007FailureBaseAction = FailureAction2<typeof B0_07_FAILURE, Error>;
export type B007RequestAction = ThunkAction<B007RequestBaseAction, void, AxiosInstance, B007RequestBaseAction>;
export type B007SuccessAction = ActionFunction1<WordInfo[], ThunkAction<B007SuccessBaseAction, void, AxiosInstance, B007SuccessBaseAction>>;
export type B007FailureAction = ActionFunction1<Error, ThunkAction<B007FailureBaseAction, void, AxiosInstance, B007FailureBaseAction>>;
export type B007Actions = B007RequestAction | B007SuccessAction | B007FailureAction;
