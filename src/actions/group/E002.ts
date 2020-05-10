import { createAction, ActionFunction0, ActionFunction1, ActionFunction2, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { push, CallHistoryMethodAction } from 'connected-react-router/immutable';
import { Loading } from '@actions/com';
import { ActionTypes, Paths, Consts } from '@constants';
import { B001Response, B001Request } from 'typings/api';
import { ErrorPayload, APIClass, GroupInfo } from 'typings/types';
import { State } from '@models';

/** 画像アップロード */
export const success: E002SuccessAction = createAction(ActionTypes.E0_02_SUCCESS, (info: GroupInfo) => info);

/** グループ一覧 */
const regist: GroupRegistAction = (name: string, description?: string) => async (dispatch, _, api) => {
  // 画像アップロード開始イベント
  dispatch(Loading.request());

  try {
    const res = await api.put<B001Response>(Consts.B001_URL(), {
      name,
      description,
    } as B001Request);

    // データ保存
    dispatch(
      success({
        id: res.groupId,
        name: name,
        description: description,
      })
    );

    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Groups]));
  } catch (err) {
    dispatch(Loading.failure(err));
  }
};

export type E002Payload = GroupInfo;

export type E002RequestAction = ActionFunction0<Action<any>>;
export type E002SuccessAction = ActionFunction1<GroupInfo, Action<E002Payload>>;
export type E002FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type GroupRegistPayload = E002Payload | ErrorPayload;
export type GroupRegistThunkAction = ThunkAction<
  void,
  State,
  APIClass,
  Action<GroupRegistPayload> | CallHistoryMethodAction
>;
export type GroupRegistAction = ActionFunction2<string, string | undefined, GroupRegistThunkAction>;

export default regist;
