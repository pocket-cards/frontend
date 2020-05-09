import { Record } from 'immutable';
import { RouterState } from 'connected-react-router/immutable';
import { History } from 'history';
import { IApp } from './App';
import { IA000 } from './Regist';
import { IB000 } from './Study';
import { IC000 } from './MyPage';
import { IE000 } from './Group';

export interface IState {
  router: RouterState<History.PoorMansUnknown>;
  app: IApp;
  a000: IA000;
  b000: IB000;
  c000: IC000;
  e000: IE000;
}

export interface State extends Map<keyof IState, Record<any> | RouterState> {
  get<K extends keyof IState>(key: K): IState[K];
}

export { default as App } from './App';
export { default as A000 } from './Regist';
export { default as B000, WordInfo } from './Study';
export { default as C000 } from './MyPage';
export { default as E000 } from './Group';
