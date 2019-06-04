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
import { WordInfo, IState } from '@models';
import { GROUP_ID, C007_URL, C008_URL, MODES } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { RequestAction, SuccessAction2, SuccessAction1, FailureAction1, FailureAction2 } from 'typings/types';
import { ActionCreator, Action } from 'redux';

export { default as startNew } from './B001';
export { default as answer } from './B004';

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

/** 単語テスト（当日） */
export const startNewTest = (history?: History<any>): StartNewTestAction => async (dispatch, _: any, api) => {
  dispatch({ type: B0_05_REQUEST });

  try {
    const res = await api.get(C007_URL(GROUP_ID));

    history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_05_SUCCESS,
      payload: {
        mode: MODES.NewTest,
        words: res.data,
      },
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

    history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_06_SUCCESS,
      payload: {
        mode: MODES.Review,
        words: res.data,
      },
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

    history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

    return dispatch({
      type: B0_07_SUCCESS,
      payload: {
        mode: MODES.AllTest,
        words: res.data,
      },
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
export type MODE = typeof MODES.New | typeof MODES.NewTest | typeof MODES.AllTest | typeof MODES.Review;

export type StartNewAction = ActionCreator<ThunkAction<Promise<void>, any, AxiosInstance, Action<B001Actions>>>;
export type NextAction = ThunkAction<B002Actions, any, AxiosInstance, B002Actions>;
export type RetryAction = ThunkAction<B003Actions, any, AxiosInstance, B003Actions>;
export type AnswerAction = ActionCreator<ThunkAction<Promise<void>, IState, AxiosInstance, Action<B004Actions>>> ; 
export type StartNewTestAction = ThunkAction<Promise<B005Actions>, any, AxiosInstance, B005Actions>;
export type StartReviewAction = ThunkAction<Promise<B006Actions>, any, AxiosInstance, B006Actions>;
export type StartTestAction = ThunkAction<Promise<B007Actions>, any, AxiosInstance, B007Actions>;

/** 単語学習画面のActions */
export interface Actions {
  /** 新規単語学習 */
  startNew: (history: History<any>) => void;
  /** 次の単語 */
  next: () => NextAction;
  /** 学習リトライ */
  retry: () => RetryAction;
  /** テスト回答(YES/NO) */
  answer: (word: string, yes: boolean) => AnswerAction;
  /** 単語テスト（当日）*/
  startNewTest: (history: History<any>) => StartNewTestAction;
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
export type B001RequestAction = ThunkAction<B001RequestBaseAction, void, AxiosInstance, B001RequestBaseAction>;
export type B001SuccessAction = ActionCreator<ThunkAction<B001SuccessBaseAction, void, AxiosInstance, B001SuccessBaseAction>>;
export type B001FailureAction = ActionCreator<ThunkAction<B001FailureBaseAction, void, AxiosInstance, B001FailureBaseAction>>;

export type B001Actions = B001RequestAction | B001SuccessAction | B001FailureAction;

/** 次の単語 */
export type B002RequestAction = RequestAction<typeof B0_02_REQUEST>;
export type B002SuccessAction = SuccessAction1<typeof B0_02_SUCCESS>;
export type B002FailureAction = FailureAction1<typeof B0_02_FAILURE>;
export type B002Actions = B002RequestAction | B002SuccessAction | B002FailureAction;

/** 単語リトライ */
export type B003RequestAction = RequestAction<typeof B0_03_REQUEST>;
export type B003SuccessAction = SuccessAction1<typeof B0_03_SUCCESS>;
export type B003FailureAction = FailureAction1<typeof B0_03_FAILURE>;
export type B003Actions = B003RequestAction | B003SuccessAction | B003FailureAction;

/** テスト結果(YES/NO) */
export type B004_SUCCESS_PAYLOAD = {
  yes: boolean;
};

export type B004RequestBaseAction = RequestAction<typeof B0_04_REQUEST>;
export type B004SuccessBaseAction = SuccessAction2<typeof B0_04_SUCCESS, B004_SUCCESS_PAYLOAD>;
export type B004FailureBaseAction = FailureAction2<typeof B0_04_FAILURE, Error>;
export type B004RequestAction = ThunkAction<B004RequestBaseAction, void, AxiosInstance, B004RequestBaseAction>;
export type B004SuccessAction = ActionCreator<ThunkAction<B004SuccessBaseAction, void, AxiosInstance, B004SuccessBaseAction>>;
export type B004FailureAction = ActionCreator<ThunkAction<B004FailureBaseAction, void, AxiosInstance, B004FailureBaseAction>>;
export type B004Actions = B004RequestAction | B004SuccessAction | B004FailureAction;

/** 新規単語テスト開始 */
export type B005_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B005RequestAction = RequestAction<typeof B0_05_REQUEST>;
export type B005SuccessAction = SuccessAction2<typeof B0_05_SUCCESS, B005_SUCCESS_PAYLOAD>;
export type B005FailureAction = FailureAction1<typeof B0_05_FAILURE>;
export type B005Actions = B005RequestAction | B005SuccessAction | B005FailureAction;

/** 単語復習開始 */
export type B006_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B006RequestAction = RequestAction<typeof B0_06_REQUEST>;
export type B006SuccessAction = SuccessAction2<typeof B0_06_SUCCESS, B006_SUCCESS_PAYLOAD>;
export type B006FailureAction = FailureAction1<typeof B0_06_FAILURE>;
export type B006Actions = B006RequestAction | B006SuccessAction | B006FailureAction;

/** 単語テスト（全部） */
export type B007_SUCCESS_PAYLOAD = {
  mode: string;
  words: WordInfo[];
};

export type B007RequestAction = RequestAction<typeof B0_07_REQUEST>;
export type B007SuccessAction = SuccessAction2<typeof B0_07_SUCCESS, B007_SUCCESS_PAYLOAD>;
export type B007FailureAction = FailureAction1<typeof B0_07_FAILURE>;
export type B007Actions = B007RequestAction | B007SuccessAction | B007FailureAction;
