import { IApp } from './App';
import { IA000 } from './Regist';
import { Record } from 'immutable';

export interface State {
  app: IApp;
  A000: IA000;
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}

export { default as App } from './App';
export { default as A000 } from './Regist';
