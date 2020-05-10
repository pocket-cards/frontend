import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router/immutable';
import { Consts, Paths, ActionTypes } from '@constants';
import { C007Response, WordItem } from 'typings/api';
import { Payload, ErrorPayload, APIClass } from 'typings/types';
import { WordInfo, State } from '@models';

/** 単語テスト */
export const request: B007RequestAction = createAction(ActionTypes.B0_07_REQUEST);
export const success: B007SuccessAction = createAction(ActionTypes.B0_07_SUCCESS, (data: WordItem[]) => ({
  mode: Consts.MODES.AllTest,
  words: data,
}));
export const failure: B007FailureAction = createAction(ActionTypes.B0_07_FAILURE, (error: Error) => ({ error }));

/** 単語テスト */
// tslint:disable-next-line: ter-arrow-parens
const startTest: StartTestAction = () => async (dispatch, store, api) => {
  // 既存単語クリア
  dispatch(request());

  // 画面遷移
  dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]));

  try {
    const { groupId } = store().get('app');
    const res = await api.get<C007Response>(Consts.C007_URL(groupId));

    // データ保存
    dispatch(success(res.words));
  } catch (err) {
    dispatch(failure(err));
  }
};

export interface B007Payload {
  mode: string;
  words: WordInfo[];
}
export type B007RequestAction = ActionFunction0<Action<Payload>>;
export type B007SuccessAction = ActionFunction1<WordInfo[], Action<B007Payload>>;
export type B007FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type StartTestPayload = Payload | B007Payload | ErrorPayload;
export type StartTestThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<StartTestPayload>>;
export type StartTestAction = ActionFunction0<StartTestThunkAction>;

export default startTest;
