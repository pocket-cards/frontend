import { Record } from 'immutable';
import { ROUTE_PATH_INDEX } from '@constants/Paths';

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

export interface AppUIProps {
  tabIndex: number;
  isLoading: boolean;
  isLoggedIn: boolean;
  showHeader: boolean;
  showFooter: boolean;
}

export interface AppProps extends AppUIProps {}

/**
 * App共通ステータス
 */
export default class App extends Record<AppProps>({
  tabIndex: ROUTE_PATH_INDEX.RegistInit,
  isLoading: false,
  isLoggedIn: false,
  showHeader: true,
  showFooter: true,
}) {
  tabChange(index: number) {
    return this.set('tabIndex', index);
  }

  setShowHeader(visible: boolean) {
    return this.set('showHeader', visible);
  }

  setShowFooter(visible: boolean) {
    return this.set('showFooter', visible);
  }

  setLoggedIn(loggedin: boolean) {
    return this.set('isLoggedIn', loggedin);
  }
}
