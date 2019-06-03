// declare module 'redux-api-middleware';

/** Actions */
export interface RequestAction<T> {
  type: T;
}

export interface SuccessAction<T, P = any> {
  type: T;
  payload?: P;
}

export interface FailureAction<T> {
  type: T;
  payload: Error;
}
