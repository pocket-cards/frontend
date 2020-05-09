import { ActionFunction0, ActionFunction1, Action, createAction } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { CognitoUser } from '@aws-amplify/auth';
import { APP_04_REQUEST, APP_04_SUCCESS, APP_04_FAILURE } from '@constants/ActionTypes';
import { ErrorPayload, APIClass } from 'typings/types';
import { State } from '@models';

/** ログイン状態変更 */
export const request: App04RequestAction = createAction(APP_04_REQUEST);
export const success: App04SuccessAction = createAction(APP_04_SUCCESS, (user: CognitoUser) => ({ user }));
export const failure: App04FailureAction = createAction(APP_04_FAILURE, (error: Error) => ({ error }));

/** ログイン状態変更 */
// tslint:disable-next-line: ter-arrow-parens
const loggedIn: LoggedInAction = user => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(user));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** ログイン状態 */
export interface App04Payload {
  user: CognitoUser;
}
export type App04RequestAction = ActionFunction0<Action<any>>;
export type App04SuccessAction = ActionFunction1<CognitoUser, Action<App04Payload>>;
export type App04FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type LoggedInPayload = App04Payload | ErrorPayload;
export type LoggedInActionThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<LoggedInPayload>>;
export type LoggedInAction = ActionFunction1<CognitoUser, LoggedInActionThunkAction>;

export default loggedIn;
