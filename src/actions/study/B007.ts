import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { History } from 'history';
import { MODES, GROUP_ID, C007_URL } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { B0_07_REQUEST, B0_07_SUCCESS, B0_07_FAILURE } from '@constants/ActionTypes';
import { C007Response, WordItem } from 'typings/api';
import { Payload, ErrorPayload, APIClass } from 'typings/types';
import { WordInfo, IState } from '@models';

/** 単語テスト */
export const request: B007RequestAction = createAction(B0_07_REQUEST);
export const success: B007SuccessAction = createAction(B0_07_SUCCESS, (data: WordItem[]) => ({ mode: MODES.AllTest, words: data }));
export const failure: B007FailureAction = createAction(B0_07_FAILURE, (error: Error) => ({ error }));

/** 単語テスト */
// tslint:disable-next-line: ter-arrow-parens
const startTest: StartTestAction = (history?: History<any>) => async (dispatch, _, api) => {
  // 既存単語クリア
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

  try {
    const res = await api.get<C007Response>(C007_URL(GROUP_ID));

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
export type StartTestThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<StartTestPayload>>;
export type StartTestAction = ActionFunction1<History<any>, StartTestThunkAction>;

export default startTest;
