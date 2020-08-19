import { C002ResItem } from './api';

declare module '*.svg' {
  const content: string;
  export default content;
}

export interface GroupInfo {
  id: string;
  name: string;
  description?: string;
}

export interface GroupWordsItem {
  groupId: string;
  words: C002ResItem[];
}

export interface ErrorPayload {
  error: Error;
}
export interface Payload {}

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
  get<T = any>(path: string, headers?: any, name?: string): Promise<T>;
  put<T = any>(path: string, body?: any, name?: string): Promise<T>;
  post<T = any>(path: string, body?: any, name?: string): Promise<T>;
  del<T = any>(path: string, body?: any, name?: string): Promise<T>;
}

export type GET_ACTION<T = any> = (path: string, headers?: any, name?: string) => Promise<T>;
export type PUT_ACTION<T = any> = (path: string, body?: any, name?: string) => Promise<T>;
export type POST_ACTION<T = any> = (path: string, body?: any, name?: string) => Promise<T>;

export type PathInfo = { [key: string]: ScreenInfo };

export interface ScreenInfo {
  showFooter: boolean;
  showBack: boolean;
  title?: string;
}
