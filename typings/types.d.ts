// declare module 'redux-api-middleware';

/** Actions */
export interface RequestAction<T> {
  type: T;
}

export interface SuccessAction1<T> {
  type: T;
}

export interface SuccessAction2<T, P> {
  type: T;
  payload: P;
}

export interface FailureAction1<T> {
  type: T;
}

export interface FailureAction2<T, P = Error> {
  type: T;
  payload: P;
}
