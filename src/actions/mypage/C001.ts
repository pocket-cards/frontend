import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, Consts } from '@constants';
import { State } from '@models';
import { A002Response } from 'typings/api';
import { ErrorPayload, APIClass } from 'typings/types';

/** 学習履歴取得 */
export const request: C001RequestAction = createAction(ActionTypes.C0_01_REQUEST);
export const success: C001SuccessAction = createAction(ActionTypes.C0_01_SUCCESS, (data: A002Response) => ({ data }));
export const failure: C001FailureAction = createAction(ActionTypes.C0_01_FAILURE, (error: Error) => ({ error }));

/** 学習履歴取得 */
const history: HistoryAction = () => async (dispatch, _, api) => {
  // 学習履歴取得開始イベント
  dispatch(request());

  try {
    const res = await api.get<A002Response>(Consts.A002_URL());
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** 学習履歴取得 */
export interface C001Payload {
  data: A002Response;
}
export type C001RequestAction = ActionFunction0<Action<any>>;
export type C001SuccessAction = ActionFunction1<A002Response, Action<C001Payload>>;
export type C001FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type HistoryPayload = C001Payload | ErrorPayload;
export type HistoryThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<HistoryPayload>>;
export type HistoryAction = ActionFunction0<HistoryThunkAction>;

export default history;
