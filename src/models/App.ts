import { Record } from 'immutable';
import { ROUTE_PATH_INDEX } from '@constants/Paths';

export interface AppProps {
  tabIndex: number;
}

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

/**
 * App共通ステータス
 */
export default class App extends Record<AppProps>({
  tabIndex: ROUTE_PATH_INDEX.Regist,
}) {

  tabChange(index: number) {
    console.log(index);

    const t = this.set('tabIndex', index);

    console.log(t);

    return t;
  }
}
