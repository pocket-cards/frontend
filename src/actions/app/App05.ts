import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { APP_05_REQUEST, APP_05_SUCCESS, APP_05_FAILURE } from '@constants/ActionTypes';
import { ErrorPayload, APIClass, Payload } from 'typings/types';
import { State } from '@models';

/** ログアウト */
export const request: App05RequestAction = createAction(APP_05_REQUEST);
export const success: App05SuccessAction = createAction(APP_05_SUCCESS);
export const failure: App05FailureAction = createAction(APP_05_FAILURE, (error: Error) => ({ error }));

/** ログアウト */
const logout: LogoutAction = () => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success);
  } catch (err) {
    dispatch(failure(err));
  }
};

export type App05RequestAction = ActionFunction0<Action<Payload>>;
export type App05SuccessAction = ActionFunction0<Action<Payload>>;
export type App05FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type LogoutPayload = Payload | ErrorPayload;
export type LogoutActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<LogoutPayload>>;
export type LogoutAction = ActionFunction0<LogoutActionThunkAction>;

export default logout;
