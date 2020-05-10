import { ActionTypes } from '@constants';
import { createAction, ActionFunction0, Action, ActionFunction1 } from 'redux-actions';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';

/** バー表示制御 */
export const request: App02RequestAction = createAction(ActionTypes.APP_02_REQUEST);
export const success: App02SuccessAction = createAction(ActionTypes.APP_02_SUCCESS, (visible: boolean) => ({
  visible,
}));
export const failure: App02FailureAction = createAction(ActionTypes.APP_02_FAILURE, (error: Error) => ({ error }));

/** バー表示制御 */
const showHeader: ShowHeaderAction = (visible) => async (dispatch) => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(visible));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** Hide Bar Header */
export interface App02Payload {
  visible: boolean;
}
export type App02RequestAction = ActionFunction0<Action<any>>;
export type App02SuccessAction = ActionFunction1<boolean, Action<App02Payload>>;
export type App02FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type ShowHeaderPayload = App02Payload | ErrorPayload;
export type ShowHeaderThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ShowHeaderPayload>>;
export type ShowHeaderAction = ActionFunction1<boolean, ShowHeaderThunkAction>;

export default showHeader;
