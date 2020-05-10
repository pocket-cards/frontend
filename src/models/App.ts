import { Record } from 'immutable';
import { Paths } from '@constants';
import { CognitoUser } from '@aws-amplify/auth';

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

export interface AppUIProps {
  tabIndex: number;
  isLoading: boolean;
  user: CognitoUser | undefined;
  showHeader: boolean;
  showFooter: boolean;
  groupId: string;
}

export interface AppProps extends AppUIProps {}

/**
 * App共通ステータス
 */
export default class App extends Record<AppProps>({
  tabIndex: Paths.ROUTE_PATH_INDEX.Regist,
  isLoading: false,
  user: undefined,
  showHeader: true,
  showFooter: true,
  groupId: '',
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

  setGroupId(groupId: string) {
    return this.set('groupId', groupId);
  }

  loggedIn(user: CognitoUser) {
    return this.set('user', user);
  }

  logout() {
    return this.set('user', undefined);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
