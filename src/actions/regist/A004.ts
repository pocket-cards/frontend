import { A0_04_REQUEST, A0_04_SUCCESS, A0_04_FAILURE } from '@constants/ActionTypes';
import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ErrorPayload, APIClass, Payload } from 'typings/types';
import { ThunkAction } from 'redux-thunk';
import { IState } from '@models';

/** 単語クリア */
export const request: A004RequestAction = createAction(A0_04_REQUEST);
export const success: A004SuccessAction = createAction(A0_04_SUCCESS);
export const failure: A004FailureAction = createAction(A0_04_FAILURE, (error: Error) => ({ error }));

/** 単語クリア */
const clear: ClearAction = () => dispatch => {
  dispatch(request);

  try {
    dispatch(success);
  } catch (err) {
    dispatch(failure(err));
  }
};

/** 単語クリア */
export type A004RequestAction = ActionFunction0<Action<Payload>>;
export type A004SuccessAction = ActionFunction0<Action<Payload>>;
export type A004FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type ClearPayload = Payload | ErrorPayload;
export type ClearThunkAction = ThunkAction<void, IState, APIClass, Action<ClearPayload>>;
export type ClearAction = ActionFunction0<ClearThunkAction>;

export default clear;
