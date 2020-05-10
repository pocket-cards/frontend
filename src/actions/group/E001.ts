import { createAction, ActionFunction0, Action, ActionFunction1 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { Loading } from '@actions/com';
import { ActionTypes, Consts } from '@constants';
import { B002Response } from 'typings/api';
import { ErrorPayload, APIClass, Payload } from 'typings/types';
import { State } from '@models';

/** 画像アップロード */
export const success: E001SuccessAction = createAction(ActionTypes.E0_01_SUCCESS, (data: B002Response) => ({
  ...data,
}));

/** グループ一覧 */
const list: GroupListAction = () => async (dispatch, _, api) => {
  // 画像アップロード開始イベント
  dispatch(Loading.request());

  try {
    const res = await api.get<B002Response>(Consts.B002_URL());
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

export type E001Payload = B002Response;

export type E001SuccessAction = ActionFunction1<B002Response, Action<E001Payload>>;

export type GroupListPayload = Payload | E001Payload | ErrorPayload;
export type GroupListThunkAction = ThunkAction<void, State, APIClass, Action<GroupListPayload>>;
export type GroupListAction = ActionFunction0<GroupListThunkAction>;

export default list;
