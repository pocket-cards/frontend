import { RequestAction, FailureAction1, SuccessAction2, APIClass } from 'typings/types';
import {
  APP_01_REQUEST,
  APP_01_SUCCESS,
  APP_01_FAILURE,
  APP_02_REQUEST,
  APP_02_SUCCESS,
  APP_02_FAILURE,
  APP_03_REQUEST,
  APP_03_SUCCESS,
  APP_03_FAILURE,
  APP_04_REQUEST,
  APP_04_SUCCESS,
  APP_04_FAILURE,
} from '@constants/ActionTypes';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';
import { ActionFunction1, Action } from 'redux-actions';

export { default as tabChange } from './App01';
export { default as showHeader } from './App02';
export { default as showFooter } from './App03';
export { default as setLoggedIn } from './App04';

// ------------------------------
// TypeScript Definetion
// ------------------------------

export interface Actions {
  // タブ画面変更
  tabChange(index: number): TabChangeAction;
  /** Header Visible */
  showHeader(visible: boolean): ShowHeaderAction;
  /** Footer Visible */
  showFooter(visible: boolean): ShowFooterAction;
  /** Set loggedin status */
  setLoggedIn(loggedIn: boolean): ShowFooterAction;
}

export type TabChangeThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<App01Actions>>;
export type TabChangeAction = ActionFunction1<number, TabChangeThunkAction>;

export type ShowHeaderThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<App02Actions>>;
export type ShowHeaderAction = ActionFunction1<boolean, ShowHeaderThunkAction>;

export type ShowFooterThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<App03Actions>>;
export type ShowFooterAction = ActionFunction1<boolean, ShowFooterThunkAction>;

export type SetLoggedInThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<App04Actions>>;
export type SetLoggedInAction = ActionFunction1<boolean, SetLoggedInThunkAction>;

/** Tab Change */
export interface App01Payload {
  index: number;
}
export type App01RequestBaseAction = RequestAction<typeof APP_01_REQUEST>;
export type App01SuccessBaseAction = SuccessAction2<typeof APP_01_SUCCESS, App01Payload>;
export type App01FailureBaseAction = FailureAction1<typeof APP_01_FAILURE>;
export type App01Actions = App01RequestAction | App01SuccessAction | App01FailureAction;
export type App01RequestAction = ThunkAction<App01RequestBaseAction, IState, APIClass, App01RequestBaseAction>;
export type App01SuccessAction = ActionFunction1<number, ThunkAction<App01SuccessBaseAction, IState, APIClass, App01SuccessBaseAction>>;
export type App01FailureAction = ActionFunction1<Error, ThunkAction<App01FailureBaseAction, IState, APIClass, App01FailureBaseAction>>;

/** Hide Bar Header */
export interface App02Payload {
  visible: boolean;
}
export type App02RequestBaseAction = RequestAction<typeof APP_02_REQUEST>;
export type App02SuccessBaseAction = SuccessAction2<typeof APP_02_SUCCESS, App02Payload>;
export type App02FailureBaseAction = FailureAction1<typeof APP_02_FAILURE>;
export type App02Actions = App02RequestAction | App02SuccessAction | App02FailureAction;
export type App02RequestAction = ThunkAction<App02RequestBaseAction, IState, APIClass, App02RequestBaseAction>;
export type App02SuccessAction = ActionFunction1<boolean, ThunkAction<App02SuccessBaseAction, IState, APIClass, App02SuccessBaseAction>>;
export type App02FailureAction = ActionFunction1<Error, ThunkAction<App02FailureBaseAction, IState, APIClass, App02FailureBaseAction>>;

export interface App03Payload {
  visible: boolean;
}
export type App03RequestBaseAction = RequestAction<typeof APP_03_REQUEST>;
export type App03SuccessBaseAction = SuccessAction2<typeof APP_03_SUCCESS, App03Payload>;
export type App03FailureBaseAction = FailureAction1<typeof APP_03_FAILURE>;
export type App03Actions = App03RequestAction | App03SuccessAction | App03FailureAction;
export type App03RequestAction = ThunkAction<App03RequestBaseAction, IState, APIClass, App03RequestBaseAction>;
export type App03SuccessAction = ActionFunction1<boolean, ThunkAction<App03SuccessBaseAction, IState, APIClass, App03SuccessBaseAction>>;
export type App03FailureAction = ActionFunction1<Error, ThunkAction<App03FailureBaseAction, IState, APIClass, App03FailureBaseAction>>;

export interface App04Payload {
  loggedin: boolean;
}
export type App04RequestBaseAction = RequestAction<typeof APP_04_REQUEST>;
export type App04SuccessBaseAction = SuccessAction2<typeof APP_04_SUCCESS, App04Payload>;
export type App04FailureBaseAction = FailureAction1<typeof APP_04_FAILURE>;
export type App04Actions = App04RequestAction | App04SuccessAction | App04FailureAction;
export type App04RequestAction = ThunkAction<App04RequestBaseAction, IState, APIClass, App04RequestBaseAction>;
export type App04SuccessAction = ActionFunction1<boolean, ThunkAction<App04SuccessBaseAction, IState, APIClass, App04SuccessBaseAction>>;
export type App04FailureAction = ActionFunction1<Error, ThunkAction<App04FailureBaseAction, IState, APIClass, App04FailureBaseAction>>;
