import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ActionTypes } from '@constants';
import { ErrorPayload } from 'typings/types';

export const request: Com02RequestAction = createAction(ActionTypes.COM_02_REQUEST);
export const failure: Com02FailureAction = createAction(ActionTypes.COM_02_FAILURE, (error: Error) => ({ error }));

type Com02RequestAction = ActionFunction0<Action<any>>;
type Com02FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;
