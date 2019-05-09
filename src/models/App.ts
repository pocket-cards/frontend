import { Record } from 'immutable';

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
  tabIndex: 0,
}) {

  tabChange(index: number) {
    console.log(index);

    const t = this.set('tabIndex', index);

    console.log(t);

    return t;
  }
}
