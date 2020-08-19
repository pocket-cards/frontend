import { CognitoUser } from '@aws-amplify/auth';
import { ThunkActionDispatch } from 'typings/redux-thunk';
import { groupSelect, loggedIn, logout, tabChange, start, status, stop, show } from './App';
import { Consts } from '@constants';
export * as Actions from './App';
export {
  App01Payload,
  App04Payload,
  App09Payload,
  App07Payload,
  App06Payload,
  App08Payload,
  App10Payload,
} from './Actions';

// ------------------------------------------------------------------------------------------
// TypeScript Definetion
// ------------------------------------------------------------------------------------------
export interface AppActions {
  // タブ画面変更
  tabChange(index: number): ThunkActionDispatch<typeof tabChange>;
  /** Set loggedin status */
  loggedIn(user: CognitoUser): ThunkActionDispatch<typeof loggedIn>;
  /** Set loggedin status */
  logout(): ThunkActionDispatch<typeof logout>;
  /** server start */
  start(): ThunkActionDispatch<typeof start>;
  /** server stop */
  stop(): ThunkActionDispatch<typeof stop>;
  /** server status */
  status(): ThunkActionDispatch<typeof status>;
  /** group select */
  groupSelect(): ThunkActionDispatch<typeof groupSelect>;
  /** display control */
  show(type: Consts.ShowTypes, value: boolean): ThunkActionDispatch<typeof show>;
}
