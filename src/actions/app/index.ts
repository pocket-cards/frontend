import { CognitoUser } from '@aws-amplify/auth';
import tabChange from './App01';
import showHeader from './App02';
import showFooter from './App03';
import loggedIn from './App04';
import logout from './App05';
import { start, stop, status } from './Server';

import { ThunkActionDispatch } from 'typings/redux-thunk';

export { default as tabChange, App01Payload } from './App01';
export { default as showHeader, App02Payload } from './App02';
export { default as showFooter, App03Payload } from './App03';
export { default as loggedIn, App04Payload } from './App04';
export { default as logout } from './App05';
export { start, stop, status } from './Server';

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
}
