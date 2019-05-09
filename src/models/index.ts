import { IApp } from './App';
import { Record } from 'immutable';

export interface State {
  app: IApp;
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}

export { default as App } from './App';
