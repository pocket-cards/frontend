import { ActionTypes } from '@constants';
import { ActionFunction0, ActionFunction1, createAction, Action } from 'redux-actions';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { State } from '@models';

/** バー表示制御 */
export const request: App03RequestAction = createAction(ActionTypes.APP_03_REQUEST);
export const success: App03SuccessAction = createAction(ActionTypes.APP_03_SUCCESS, (visible: boolean) => ({
  visible,
}));
export const failure: App03FailureAction = createAction(ActionTypes.APP_03_FAILURE, (error: Error) => ({ error }));

/** バー表示制御 */
const showFooter: ShowFooterAction = (visible) => async (dispatch) => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(visible));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** Hide Bar Header */
export interface App03Payload {
  visible: boolean;
}
export type App03RequestAction = ActionFunction0<Action<any>>;
export type App03SuccessAction = ActionFunction1<boolean, Action<App03Payload>>;
export type App03FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type ShowFooterPayload = App03Payload | ErrorPayload;
export type ShowFooterThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<ShowFooterPayload>>;
export type ShowFooterAction = ActionFunction1<boolean, ShowFooterThunkAction>;

export default showFooter;
