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

export const Edit = {
  request: request(ActionTypes.E0_03_REQUEST),
  success: createAction(ActionTypes.E0_03_SUCCESS),
  failure: failure(ActionTypes.E0_03_FAILURE),
};

export const Delete = {
  request: request(ActionTypes.E0_04_REQUEST),
  success: createAction(ActionTypes.E0_04_SUCCESS, (groupId: string) => ({ groupId })),
  failure: failure(ActionTypes.E0_04_FAILURE),
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

/** Group Edit */
export type E003Payload = void;

type GroupEditPayload = E003Payload | ErrorPayload;
type GroupEditThunkAction = ThunkAction<void, State, APIClass, Action<GroupEditPayload> | CallHistoryMethodAction>;
export type GroupEditAction = ActionFunction1<GroupInfo, GroupEditThunkAction>;

/** Group Delete */
export type E004Payload = {
  groupId: string;
};

type GroupDeletePayload = E004Payload | ErrorPayload;
type GroupDeleteThunkAction = ThunkAction<void, State, APIClass, Action<GroupDeletePayload> | CallHistoryMethodAction>;
export type GroupDeleteAction = ActionFunction0<GroupDeleteThunkAction>;
