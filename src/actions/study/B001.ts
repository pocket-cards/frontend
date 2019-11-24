import { History } from 'history';
import { B0_01_REQUEST, B0_01_SUCCESS, B0_01_FAILURE } from '@constants/ActionTypes';
import { MODES, C006_URL, GROUP_ID } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C006Response, WordItem } from 'typings/api';
import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { WordInfo, IState } from '@models';
import { ErrorPayload, APIClass, Payload } from 'typings/types';
import { ThunkAction } from 'redux-thunk';

/** 新規単語学習 */
export const request: B001RequestAction = createAction(B0_01_REQUEST);
export const success: B001SuccessAction = createAction(B0_01_SUCCESS, (data: WordItem[]) => ({ mode: MODES.New, words: data }));
export const failure: B001FailureAction = createAction(B0_01_FAILURE, (error: Error) => ({ error }));

/** 新規単語学習 */
const startNew: StartNewAction = (history?: History<any>) => async (dispatch, _, api) => {
  // 既存単語クリア
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

  try {
    const res = await api.get<C006Response>(C006_URL(GROUP_ID));

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
export type StartNewThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<StartNewPayload>>;
export type StartNewAction = ActionFunction1<History<any>, StartNewThunkAction>;

export default startNew;
