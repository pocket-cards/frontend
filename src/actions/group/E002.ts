import { createAction, ActionFunction0, ActionFunction1, ActionFunction2, Action } from 'redux-actions';
import { E0_02_REQUEST, E0_02_SUCCESS, E0_02_FAILURE } from '@constants/ActionTypes';
import { B003Response, B003Request } from 'typings/api';
import { B003_URL } from '@constants/Consts';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';

/** 画像アップロード */
export const request: E002RequestAction = createAction(E0_02_REQUEST);
export const success: E002SuccessAction = createAction(E0_02_SUCCESS, (data: B003Response) => ({ data }));
export const failure: E002FailureAction = createAction(E0_02_FAILURE, (error: Error) => ({ error }));

/** グループ一覧 */
const groupList: GroupRegistAction = (name: string, description: string) => async (dispatch, store, api) => {
  // 画像アップロード開始イベント
  dispatch(request);
  const user = store()
    .get('App')
    .get('user');

  if (!user) return;

  try {
    const res = await api.post<B003Response>(B003_URL(user.getUsername()), {
      name,
      description,
    } as B003Request);
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

// export interface E002Payload {
//   group: GroupInfo;
// }
export interface E002Payload {
  data: B003Response;
}
export type E002RequestAction = ActionFunction0<Action<any>>;
export type E002SuccessAction = ActionFunction1<B003Response, Action<E002Payload>>;
export type E002FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type GroupRegistPayload = E002Payload | ErrorPayload;
export type GroupRegistThunkAction = ThunkAction<void, IState, APIClass, Action<GroupRegistPayload>>;
export type GroupRegistAction = ActionFunction2<string, string, GroupRegistThunkAction>;

export default groupList;
