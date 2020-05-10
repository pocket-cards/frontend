import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ActionTypes } from '@constants';
import { ErrorPayload } from 'typings/types';

export const request: Com01RequestAction = createAction(ActionTypes.COM_01_REQUEST);
export const failure: Com01FailureAction = createAction(ActionTypes.COM_01_FAILURE, (error: Error) => ({ error }));

type Com01RequestAction = ActionFunction0<Action<any>>;
type Com01FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;
