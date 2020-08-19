import { createAction, Action, ActionFunction0, ActionFunction1, ActionFunction2 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { CallHistoryMethodAction } from 'connected-react-router';
import { ActionTypes } from '@constants';
import { State } from '@models';
import { ErrorPayload, APIClass } from 'typings/types';
import { C002Response, E001Response } from 'typings/api';

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

export const Detail = {
  request: request(ActionTypes.E0_06_REQUEST),
  success: createAction(
    ActionTypes.E0_06_SUCCESS,
    (res: E001Response): E006Payload => ({
      res,
    })
  ),
  failure: failure(ActionTypes.E0_06_FAILURE),
};

export const Delete = {
  request: request(ActionTypes.E0_08_REQUEST),
  success: createAction(
    ActionTypes.E0_08_SUCCESS,
    (groupId: string, word: string): E008Payload => ({
      groupId,
      word,
    })
  ),
  failure: failure(ActionTypes.E0_08_FAILURE),
};

/** Word List */
export type E005Payload = {
  groupId: string;
  words: C002Response;
};

type WordListPayload = E005Payload | ErrorPayload;
type WordListThunkAction = ThunkAction<void, State, APIClass, Action<WordListPayload>>;
export type WordListAction = ActionFunction1<string, WordListThunkAction>;

/** Word Details */
export type E006Payload = {
  res: E001Response;
};

type WordDetailPayload = E006Payload | ErrorPayload;
type WordDetailThunkAction = ThunkAction<void, State, APIClass, Action<WordDetailPayload> | CallHistoryMethodAction>;
export type WordDetailAction = ActionFunction1<string, WordDetailThunkAction>;

/** Word Delete */
export type E008Payload = {
  groupId: string;
  word: string;
};

type WordDeletePayload = E008Payload | ErrorPayload;
type WordDeleteThunkAction = ThunkAction<void, State, APIClass, Action<WordDeletePayload> | CallHistoryMethodAction>;
export type WordDeleteAction = ActionFunction2<string, string, WordDeleteThunkAction>;
