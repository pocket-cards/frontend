export interface GroupInfo {
  id: string;
  name: string;
  description?: string;
}

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

export interface APIClass {
  get<T = any>(path: string, headers?: any): Promise<T>;
  put<T = any>(path: string, body?: any): Promise<T>;
  post<T = any>(path: string, body?: any): Promise<T>;
}

export type GET_ACTION<T = any> = (path: string, headers?: any) => Promise<T>;
export type PUT_ACTION<T = any> = (path: string, body?: any) => Promise<T>;
export type POST_ACTION<T = any> = (path: string, body?: any) => Promise<T>;
