import { createAction, Action, ActionFunction0, ActionFunction2, ActionFunction1 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { CallHistoryMethodAction } from 'connected-react-router';
import { ActionTypes } from '@constants';
import { State } from '@models';
import { ErrorPayload, APIClass, GroupInfo } from 'typings/types';
import { B002Response } from 'typings/api';

export const request = (actionType: string): ActionFunction0<Action<any>> => createAction(actionType);

export const failure = (actionType: string): ActionFunction1<Error, Action<ErrorPayload>> =>
  createAction(actionType, (error: Error) => ({ error }));

export const List = {
  request: request(ActionTypes.E0_01_REQUEST),
  success: createAction(ActionTypes.E0_01_SUCCESS, (data: B002Response) => ({
    ...data,
  })),
  failure: failure(ActionTypes.E0_01_FAILURE),
};

export const Regist = {
  request: request(ActionTypes.E0_02_REQUEST),
  success: createAction(ActionTypes.E0_02_SUCCESS, (info: GroupInfo) => info),
  failure: failure(ActionTypes.E0_02_FAILURE),
};

/** Group List */
export type E001Payload = B002Response;

type GroupListPayload = E001Payload | ErrorPayload;
type GroupListThunkAction = ThunkAction<void, State, APIClass, Action<GroupListPayload>>;
export type GroupListAction = ActionFunction0<GroupListThunkAction>;

/** Group Regist */
export type E002Payload = GroupInfo;

type GroupRegistPayload = E002Payload | ErrorPayload;
type GroupRegistThunkAction = ThunkAction<void, State, APIClass, Action<GroupRegistPayload> | CallHistoryMethodAction>;
export type GroupRegistAction = ActionFunction2<string, string | undefined, GroupRegistThunkAction>;
