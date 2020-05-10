import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ErrorPayload } from 'typings/types';

export const request = (actionType: string): ActionFunction0<Action<any>> => createAction(actionType);

export const failure = (actionType: string): ActionFunction1<Error, Action<ErrorPayload>> =>
  createAction(actionType, (error: Error) => ({ error }));
