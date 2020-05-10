import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { COM_01_REQUEST, COM_01_FAILURE } from '@constants/ActionTypes';
import { Payload, ErrorPayload } from 'typings/types';

export const request: Com01RequestAction = createAction(COM_01_REQUEST);
export const failure: Com01FailureAction = createAction(COM_01_FAILURE, (error: Error) => ({ error }));

type Com01RequestAction = ActionFunction0<Action<Payload>>;
type Com01FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;
