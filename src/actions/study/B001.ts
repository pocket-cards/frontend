import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router/immutable';
import { ActionTypes, Consts, Paths } from '@constants';
import { C006Response, WordItem } from 'typings/api';
import { WordInfo, State } from '@models';
import { ErrorPayload, APIClass, Payload } from 'typings/types';

/** 新規単語学習 */
export const request: B001RequestAction = createAction(ActionTypes.B0_01_REQUEST);
export const success: B001SuccessAction = createAction(ActionTypes.B0_01_SUCCESS, (data: WordItem[]) => ({
  mode: Consts.MODES.New,
  words: data,
}));
export const failure: B001FailureAction = createAction(ActionTypes.B0_01_FAILURE, (error: Error) => ({ error }));

/** 新規単語学習 */
const startNew: StartNewAction = () => async (dispatch, store, api) => {
  const { groupId } = store().get('app');

  // 既存単語クリア
  dispatch(request());

  // 画面遷移
  dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]));

  try {
    const res = await api.get<C006Response>(Consts.C006_URL(groupId));

    // データ保存
    dispatch(success(res.words));
  } catch (err) {
    dispatch(failure(err));
  }
};

export interface B001Payload {
  mode: string;
  words: WordInfo[];
}
export type B001RequestAction = ActionFunction0<Action<Payload>>;
export type B001SuccessAction = ActionFunction1<WordItem[], Action<B001Payload>>;
export type B001FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type StartNewPayload = Payload | B001Payload | ErrorPayload;
export type StartNewThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<StartNewPayload>>;
export type StartNewAction = ActionFunction0<StartNewThunkAction>;

export default startNew;
