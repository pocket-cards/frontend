import { E0_01_REQUEST, E0_01_SUCCESS, E0_01_FAILURE } from '@constants/ActionTypes';
import { B002_URL } from '@constants/Consts';
import { B002Response } from 'typings/api';
import { createAction, ActionFunction0, Action, ActionFunction1 } from 'redux-actions';
import { ErrorPayload, APIClass, Payload } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';

/** 画像アップロード */
export const request: E001RequestAction = createAction(E0_01_REQUEST);
export const success: E001SuccessAction = createAction(E0_01_SUCCESS, (data: B002Response) => ({ data }));
export const failure: E001FailureAction = createAction(E0_01_FAILURE, (error: Error) => ({ error }));

/** グループ一覧 */
const groupList: GroupListAction = () => async (dispatch, store, api) => {
  // 画像アップロード開始イベント
  dispatch(request);

  try {
    const res = await api.get<B002Response>(B002_URL());
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

export interface E001Payload {
  data: B002Response;
}
export type E001RequestAction = ActionFunction0<Action<Payload>>;
export type E001SuccessAction = ActionFunction1<B002Response, Action<E001Payload>>;
export type E001FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type GroupListPayload = Payload | E001Payload | ErrorPayload;
export type GroupListThunkAction = ThunkAction<void, State, APIClass, Action<GroupListPayload>>;
export type GroupListAction = ActionFunction0<GroupListThunkAction>;

export default groupList;
