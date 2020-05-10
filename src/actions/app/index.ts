import { CognitoUser } from '@aws-amplify/auth';
import { ThunkActionDispatch } from 'typings/redux-thunk';
import { groupSelect, loggedIn, logout, showFooter, showHeader, tabChange, start, status, stop } from './App';

export * from './App';
export * from './Actions';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface Actions {
  // タブ画面変更
  tabChange(index: number): ThunkActionDispatch<typeof tabChange>;
  /** Header Visible */
  showHeader(visible: boolean): ThunkActionDispatch<typeof showHeader>;
  /** Footer Visible */
  showFooter(visible: boolean): ThunkActionDispatch<typeof showFooter>;
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
}
