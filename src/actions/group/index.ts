import { Action, ActionFunction1, ActionFunction0, ActionFunction2 } from 'redux-actions';
import { History } from 'history';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';
import { RequestAction, SuccessAction2, FailureAction2, SuccessAction1, APIClass, GroupInfo } from 'typings/types';
import {
  E0_01_REQUEST,
  E0_01_SUCCESS,
  E0_01_FAILURE,
  E0_02_REQUEST,
  E0_02_SUCCESS,
  E0_02_FAILURE,
  E0_03_REQUEST,
  E0_03_SUCCESS,
  E0_03_FAILURE,
} from '@constants/ActionTypes';
import { D001Response, B002Response, B003Request, B003Response } from 'typings/api';

export { default as groupList } from './E001';
export { default as removeWord } from './E002';
export { default as registWords } from './E003';

/** 単語登録画面のActions */
// export interface Actions {
//   // グループ一覧
//   groupList: () => GroupListAction;

//   // 指定単語削除
//   groupRegist: (word: string) => GroupAddAction;

//   // 単語一括登録
//   groupEdit: (words: string[], history?: History<any>) => GroupEditAction;
// }

/** グループ一覧取得 */
export type GroupListThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<E001Actions>>;
export type GroupListAction = ActionFunction2<string, History<any>, GroupListThunkAction>;
/** グループ新規追加 */
export type GroupRegistThunkAction = ThunkAction<void, IState, APIClass, Action<E002Actions>>;
export type GroupRegistAction = ActionFunction2<string, string, GroupRegistThunkAction>;
/** グループ編集 */
export type GroupEditThunkAction = ThunkAction<Promise<void>, IState, APIClass, Action<E003Actions>>;
export type GroupEditAction = ActionFunction2<string[], History<any>, GroupEditThunkAction>;

/** グループ一覧取得 */
export type E001_SUCCESS_PAYLOAD = B002Response;
export type E001RequestBaseAction = RequestAction<typeof E0_01_REQUEST>;
export type E001SuccessBaseAction = SuccessAction2<typeof E0_01_SUCCESS, E001_SUCCESS_PAYLOAD>;
export type E001FailureBaseAction = FailureAction2<typeof E0_01_FAILURE, Error>;
export type E001RequestAction = ThunkAction<E001RequestBaseAction, IState, APIClass, E001RequestBaseAction>;
export type E001SuccessAction = ActionFunction1<B002Response, ThunkAction<E001SuccessBaseAction, IState, APIClass, E001SuccessBaseAction>>;
export type E001FailureAction = ActionFunction1<Error, ThunkAction<E001FailureBaseAction, IState, APIClass, E001FailureBaseAction>>;

export type E001Actions = E001RequestAction | E001SuccessAction | E001FailureAction;

/** 単語削除 */
export type E002_SUCCESS_PAYLOAD = {
  group: GroupInfo;
};

export type E002RequestBaseAction = RequestAction<typeof E0_02_REQUEST>;
export type E002SuccessBaseAction = SuccessAction2<typeof E0_02_SUCCESS, E002_SUCCESS_PAYLOAD>;
export type E002FailureBaseAction = FailureAction2<typeof E0_02_FAILURE, Error>;
export type E002RequestAction = ThunkAction<E002RequestBaseAction, IState, APIClass, E002RequestBaseAction>;
export type E002SuccessAction = ActionFunction1<B003Response, ThunkAction<E002SuccessBaseAction, IState, APIClass, E002SuccessBaseAction>>;
export type E002FailureAction = ActionFunction1<Error, ThunkAction<E002FailureBaseAction, IState, APIClass, E002FailureBaseAction>>;

export type E002Actions = E002RequestAction | E002SuccessAction | E002FailureAction;

// /** 単語登録 */
// export type E003RequestBaseAction = RequestAction<typeof E0_03_REQUEST>;
// export type E003SuccessBaseAction = SuccessAction1<typeof E0_03_SUCCESS>;
// export type E003FailureBaseAction = FailureAction2<typeof E0_03_FAILURE, Error>;
// export type E003RequestAction = ThunkAction<E003RequestBaseAction, IState, APIClass, E003RequestBaseAction>;
// export type E003SuccessAction = ActionFunction0<ThunkAction<E003SuccessBaseAction, IState, APIClass, E003SuccessBaseAction>>;
// export type E003FailureAction = ActionFunction1<Error, ThunkAction<E003FailureBaseAction, IState, APIClass, E003FailureBaseAction>>;

// export type E003Actions = E003RequestAction | E003SuccessAction | E003FailureAction;
