import { createAction, Action, ActionFunction0, ActionFunction1 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from '@constants';
import { State } from '@models';
import { ErrorPayload, APIClass } from 'typings/types';
import { C002Response } from 'typings/api';

export const request = (actionType: string): ActionFunction0<Action<any>> => createAction(actionType);

export const failure = (actionType: string): ActionFunction1<Error, Action<ErrorPayload>> =>
  createAction(actionType, (error: Error) => ({ error }));

export const List = {
  request: request(ActionTypes.E0_05_REQUEST),
  success: createAction(
    ActionTypes.E0_05_SUCCESS,
    (groupId: string, data: C002Response): E005Payload => ({
      groupId,
      words: data,
    })
  ),
  failure: failure(ActionTypes.E0_05_FAILURE),
};

/** Word List */
export type E005Payload = {
  groupId: string;
  words: C002Response;
};

type WordListPayload = E005Payload | ErrorPayload;
type WordListThunkAction = ThunkAction<void, State, APIClass, Action<WordListPayload>>;
export type WordListAction = ActionFunction1<string, WordListThunkAction>;
