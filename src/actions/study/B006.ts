import { History } from 'history';
import { MODES, GROUP_ID, C008_URL } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C008Response } from 'typings/api';
import { B0_06_REQUEST, B0_06_SUCCESS, B0_06_FAILURE } from '@constants/ActionTypes';
import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { WordInfo, State } from '@models';
import { Payload, ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';

/** 単語復習 */
export const request: B006RequestAction = createAction(B0_06_REQUEST);
export const success: B006SuccessAction = createAction(B0_06_SUCCESS, (data: WordInfo[]) => ({ mode: MODES.Review, words: data }));
export const failure: B006FailureAction = createAction(B0_06_FAILURE, (error: Error) => ({ error }));

/** 単語復習 */
const startReview: StartReviewAction = (history?: History<any>) => async (dispatch, _, api) => {
  // 既存単語クリア
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

  try {
    const res = await api.get<C008Response>(C008_URL(GROUP_ID));

    // データ保存
    dispatch(success(res.words));
  } catch (err) {
    dispatch(failure(err));
  }
};

export interface B006Payload {
  mode: string;
  words: WordInfo[];
}
export type B006RequestAction = ActionFunction0<Action<Payload>>;
export type B006SuccessAction = ActionFunction1<WordInfo[], Action<B006Payload>>;
export type B006FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type StartReviewPayload = Payload | B006Payload | ErrorPayload;
export type StartReviewThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<StartReviewPayload>>;
export type StartReviewAction = ActionFunction1<History<any>, StartReviewThunkAction>;

export default startReview;
