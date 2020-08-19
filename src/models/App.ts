import { Record } from 'immutable';
import { Paths, Consts } from '@constants';
import { CognitoUser } from '@aws-amplify/auth';
import { App10Payload } from '@actions/app/Actions';

export interface IApp extends AppProps, Record<AppProps> {
  get<K extends keyof AppProps>(key: K): AppProps[K];
}

export interface AppUIProps {
  tabIndex: number;
  // loading
  isLoading: boolean;
  // User info
  user: CognitoUser | undefined;
  // selected group id
  groupId: string;
  // server status
  status: string;
  // グループ一覧画面の削除ボタン表示フラグ
  displayCtrl: { [key: number]: boolean };
}

export interface AppProps extends AppUIProps {}

/**
 * App共通ステータス
 */
export default class App extends Record<AppProps>({
  tabIndex: Paths.ROUTE_PATH_INDEX.Regist,
  isLoading: false,
  user: undefined,
  groupId: '',
  status: Consts.SERVER_STATUS.STOPPED,
  displayCtrl: {},
}) {
  tabChange(index: number) {
    return this.set('tabIndex', index);
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

  setShow({ type, value }: App10Payload) {
    this.displayCtrl[type] = value;

    return this.set('displayCtrl', this.displayCtrl);
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
