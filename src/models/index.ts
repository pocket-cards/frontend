import { IApp } from './App';
import { IRegist } from './Regist';
import { Record } from 'immutable';

export interface State {
  app: IApp;
  regist: IRegist;
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}

export { default as App } from './App';
export { default as Regist } from './Regist';
