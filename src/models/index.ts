import { IApp } from './App';
import { IA000 } from './Regist';
import { IB000 } from './Study';
import { IC000 } from './MyPage';

import { Record } from 'immutable';

export interface State {
  App: IApp;
  A000: IA000;
  B000: IB000;
  C000: IC000;
}

export interface IState extends Map<keyof State, Record<any>> {
  get<K extends keyof State>(key: K): State[K];
}

export { default as App } from './App';
export { default as A000 } from './Regist';
export { default as B000, WordInfo } from './Study';
export { default as C000 } from './MyPage';
