import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { History } from 'history';
import {
  B0_01_REQUEST,
  B0_01_SUCCESS,
  B0_01_FAILURE,
  B0_02_SUCCESS,
  B0_02_REQUEST,
  B0_02_FAILURE,
  B0_03_REQUEST,
  B0_03_SUCCESS,
  B0_03_FAILURE,
  B0_04_REQUEST,
  B0_04_SUCCESS,
  B0_04_FAILURE,
  B0_05_REQUEST,
  B0_05_SUCCESS,
  B0_05_FAILURE,
  B0_06_REQUEST,
  B0_06_SUCCESS,
  B0_06_FAILURE,
  B0_07_REQUEST,
  B0_07_SUCCESS,
  B0_07_FAILURE,
} from '@constants/ActionTypes';
import { WordInfo } from '@models';
import { C006_URL, GROUP_ID, C007_URL, C008_URL } from '@constants/Consts';
import { RequestAction, SuccessAction, FailureAction } from 'typings/types';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 新規単語学習開始 */
export const startNew = (history: History<any>): StartNewAction => async (dispatch, _: any, api) => {
  dispatch({ type: B0_01_REQUEST });

  try {
    const res = await api.get(C006_URL(GROUP_ID));

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_01_SUCCESS,
      payload: res.data as B001_SUCCESS_PAYLOAD,
    });
  } catch (err) {
    return dispatch({
      type: B0_01_FAILURE,
      payload: err,
    });
  }
};

/** 次の単語 */
export const next = (): NextAction => dispatch =>
  dispatch({
    type: B0_02_SUCCESS,
  });

/** 単語のリトライ */
export const retry = (): RetryAction => dispatch =>
  dispatch({
    type: B0_03_SUCCESS,
  });

/** テスト回答(YES/NO) */
export const answer = (mode: string, yes: boolean): AnswerAction => dispatch =>
  dispatch({
    type: B0_04_SUCCESS,
    payload: {
      yes,
      mode,
    },
  });

/** 単語テスト（当日） */
export const startNewTest = (history: History<any>): StartNewTestAction => async (dispatch, _: any, api) => {
  dispatch({ type: B0_05_REQUEST });

  try {
    const res = await api.get(C007_URL(GROUP_ID));

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_05_SUCCESS,
      payload: res.data as B005_SUCCESS_PAYLOAD,
    });
  } catch (err) {
    return dispatch({
      type: B0_05_FAILURE,
      payload: err,
    });
  }
};

/** 単語復習開始 */
export const startReview = (history: History<any>): StartReviewAction => async (dispatch, _: any, api) => {
  dispatch({ type: B0_06_REQUEST });

  try {
    const res = await api.get(C008_URL(GROUP_ID));

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_06_SUCCESS,
      payload: res.data as B006_SUCCESS_PAYLOAD,
    });
  } catch (err) {
    return dispatch({
      type: B0_06_FAILURE,
      payload: err,
    });
  }
};

/** 単語テスト（全部） */
export const startTest = (history: History<any>): StartTestAction => async (dispatch, _: any, api) => {
  dispatch({ type: B0_07_REQUEST });

  try {
    const res = await api.get(C007_URL(GROUP_ID));

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_07_SUCCESS,
      payload: res.data as B007_SUCCESS_PAYLOAD,
    });
  } catch (err) {
    return dispatch({
      type: B0_07_FAILURE,
      payload: err,
    });
  }
};

// ------------------------------
// TypeScript Definetion
// ------------------------------
export type StartNewAction = ThunkAction<Promise<B001Actions>, any, AxiosInstance, B001Actions>;
export type NextAction = ThunkAction<B002Actions, any, AxiosInstance, B002Actions>;
export type RetryAction = ThunkAction<B003Actions, any, AxiosInstance, B003Actions>;
export type AnswerAction = ThunkAction<B004Actions, any, AxiosInstance, B004Actions>;
export type StartNewTestAction = ThunkAction<Promise<B005Actions>, any, AxiosInstance, B005Actions>;
export type StartReviewAction = ThunkAction<Promise<B006Actions>, any, AxiosInstance, B006Actions>;
export type StartTestAction = ThunkAction<Promise<B007Actions>, any, AxiosInstance, B007Actions>;

/** 単語学習画面のActions */
export interface Actions {
  // 新規単語学習開始
  startNew: (history: History<any>) => StartNewAction;
  // 次の単語
  next: () => NextAction;
  // 学習リトライ
  retry: () => RetryAction;
  // テスト回答(YES/NO)
  answer: (mode: string, yes: boolean) => AnswerAction;
  // 単語テスト（当日）
  startNewTest: (history: History<any>) => StartNewTestAction;
  // 単語復習
  startReview: (history: History<any>) => StartReviewAction;
  // 単語テスト（全部）
  startTest: (history: History<any>) => StartTestAction;
}

/** 新規単語学習 */
export type B001_SUCCESS_PAYLOAD = WordInfo[];
export type B001RequestAction = RequestAction<typeof B0_01_REQUEST>;
export type B001SuccessAction = SuccessAction<typeof B0_01_SUCCESS, B001_SUCCESS_PAYLOAD>;
export type B001FailureAction = FailureAction<typeof B0_01_FAILURE>;
export type B001Actions = B001RequestAction | B001SuccessAction | B001FailureAction;

/** 次の単語 */
export type B002RequestAction = RequestAction<typeof B0_02_REQUEST>;
export type B002SuccessAction = SuccessAction<typeof B0_02_SUCCESS>;
export type B002FailureAction = FailureAction<typeof B0_02_FAILURE>;
export type B002Actions = B002RequestAction | B002SuccessAction | B002FailureAction;

/** 単語リトライ */
export type B003RequestAction = RequestAction<typeof B0_03_REQUEST>;
export type B003SuccessAction = SuccessAction<typeof B0_03_SUCCESS>;
export type B003FailureAction = FailureAction<typeof B0_03_FAILURE>;
export type B003Actions = B003RequestAction | B003SuccessAction | B003FailureAction;

/** テスト結果(YES/NO) */
export type B004_SUCCESS_PAYLOAD = {
  mode: string;
  yes: boolean;
};

export type B004RequestAction = RequestAction<typeof B0_04_REQUEST>;
export type B004SuccessAction = SuccessAction<typeof B0_04_SUCCESS, B004_SUCCESS_PAYLOAD>;
export type B004FailureAction = FailureAction<typeof B0_04_FAILURE>;
export type B004Actions = B004RequestAction | B004SuccessAction | B004FailureAction;

/** 新規単語テスト開始 */
export type B005_SUCCESS_PAYLOAD = WordInfo[];

export type B005RequestAction = RequestAction<typeof B0_05_REQUEST>;
export type B005SuccessAction = SuccessAction<typeof B0_05_SUCCESS, B005_SUCCESS_PAYLOAD>;
export type B005FailureAction = FailureAction<typeof B0_05_FAILURE>;
export type B005Actions = B005RequestAction | B005SuccessAction | B005FailureAction;

/** 単語復習開始 */
export type B006_SUCCESS_PAYLOAD = WordInfo[];

export type B006RequestAction = RequestAction<typeof B0_06_REQUEST>;
export type B006SuccessAction = SuccessAction<typeof B0_06_SUCCESS, B006_SUCCESS_PAYLOAD>;
export type B006FailureAction = FailureAction<typeof B0_06_FAILURE>;
export type B006Actions = B006RequestAction | B006SuccessAction | B006FailureAction;

/** 単語テスト（全部） */
export type B007_SUCCESS_PAYLOAD = WordInfo[];

export type B007RequestAction = RequestAction<typeof B0_07_REQUEST>;
export type B007SuccessAction = SuccessAction<typeof B0_07_SUCCESS, B007_SUCCESS_PAYLOAD>;
export type B007FailureAction = FailureAction<typeof B0_07_FAILURE>;
export type B007Actions = B007RequestAction | B007SuccessAction | B007FailureAction;
