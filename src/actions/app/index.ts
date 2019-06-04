import { RequestAction, FailureAction, SuccessAction2 } from 'typings/types';
import { APP_01_REQUEST, APP_01_SUCCESS, APP_01_FAILURE, APP_02_REQUEST, APP_02_SUCCESS, APP_02_FAILURE } from '@constants/ActionTypes';
import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';

export const tabChange = (index: number): TabChangeAction => dispatch =>
  dispatch({
    type: APP_01_SUCCESS,
    payload: { index },
  });

// ------------------------------
// TypeScript Definetion
// ------------------------------

export type TabChangeAction = ThunkAction<App01Actions, any, AxiosInstance, App01Actions>;

export interface Actions {
  // タブ画面変更
  tabChange: (index: number) => TabChangeAction;
}

/** Tab Change */
export interface App01Payload {
  index: number;
}
export type App01RequestAction = RequestAction<typeof APP_01_REQUEST>;
export type App01SuccessAction = SuccessAction2<typeof APP_01_SUCCESS, App01Payload>;
export type App01FailureAction = FailureAction<typeof APP_01_FAILURE>;
export type App01Actions = App01RequestAction | App01SuccessAction | App01FailureAction;
