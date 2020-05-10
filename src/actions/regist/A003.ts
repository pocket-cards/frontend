import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { push } from 'connected-react-router/immutable';
import { A0_03_REQUEST, A0_03_SUCCESS, A0_03_FAILURE } from '@constants/ActionTypes';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C001_URL, GROUP_ID } from '@constants/Consts';
import { State } from '@models';
import { C001Request } from 'typings/api';
import { ErrorPayload, APIClass, Payload } from 'typings/types';

/** 画像アップロード */
export const request: A003RequestAction = createAction(A0_03_REQUEST);
export const success: A003SuccessAction = createAction(A0_03_SUCCESS);
export const failure: A003FailureAction = createAction(A0_03_FAILURE, (error: Error) => ({ error }));

/** 画像アップロード */
const registWords: RegistWordsAction = (words: string[]) => async (dispatch, _, api) => {
  try {
    // 画像アップロード開始イベント
    dispatch(request);

    await api.post(C001_URL(GROUP_ID), {
      words,
    } as C001Request);

    // データ保存
    dispatch(success);
  } catch (err) {
    dispatch(failure(err));
  } finally {
    // 画面遷移
    dispatch(push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]));
  }
};

export type A003RequestAction = ActionFunction0<Action<Payload>>;
export type A003SuccessAction = ActionFunction0<Action<Payload>>;
export type A003FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type RegistWordsPayload = Payload | ErrorPayload;
export type RegistWordsThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<RegistWordsPayload>>;
export type RegistWordsAction = ActionFunction1<string[], RegistWordsThunkAction>;

export default registWords;
