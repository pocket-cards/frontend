import { IApp } from './App';
import { IA000 } from './Regist';
import { IB000 } from './Study';
import { IC000 } from './MyPage';
import { IE000 } from './Group';

import { Record } from 'immutable';

export interface IState {
  App: IApp;
  A000: IA000;
  B000: IB000;
  C000: IC000;
  E000: IE000;
}

export interface State extends Map<keyof IState, Record<any>> {
  get<K extends keyof IState>(key: K): IState[K];
}

export { default as App } from './App';
export { default as A000 } from './Regist';
export { default as B000, WordInfo } from './Study';
export { default as C000 } from './MyPage';
export { default as E000 } from './Group';
