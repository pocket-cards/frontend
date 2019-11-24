import { APP_01_REQUEST, APP_01_SUCCESS, APP_01_FAILURE } from '@constants/ActionTypes';
import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ErrorPayload, APIClass } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';

export const request: App01RequestAction = createAction(APP_01_REQUEST);
export const success: App01SuccessAction = createAction(APP_01_SUCCESS, (index: number) => ({ index }));
export const failure: App01FailureAction = createAction(APP_01_FAILURE, (error: Error) => ({ error }));

/** タブ変更 */
const tabChange: TabChangeAction = (index: number) => async (dispatch, _, api) => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(index));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** Tab Change */
export interface App01Payload {
  index: number;
}

export type App01RequestAction = ActionFunction0<Action<any>>;
export type App01SuccessAction = ActionFunction1<number, Action<App01Payload>>;
export type App01FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type TabChangePayload = App01Payload | ErrorPayload;
export type TabChangeThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<TabChangePayload>>;
export type TabChangeAction = ActionFunction1<number, TabChangeThunkAction>;

export default tabChange;
