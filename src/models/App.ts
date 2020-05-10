import { Record } from 'immutable';
import { Paths, Consts } from '@constants';
import { CognitoUser } from '@aws-amplify/auth';
import { string } from 'yup';

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

export interface AppUIProps {
  tabIndex: number;
  // loading
  isLoading: boolean;
  // User info
  user: CognitoUser | undefined;
  // show / hide header
  showHeader: boolean;
  // show / hide footer
  showFooter: boolean;
  // selected group id
  groupId: string;
  // server status
  status: string;
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
  status: Consts.SERVER_STATUS.STOPPED,
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

  updateStatus(status: string) {
    return this.set('status', status);
  }
}
