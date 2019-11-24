import { CognitoUser } from '@aws-amplify/auth';
import { TabChangeAction } from './App01';
import { ShowHeaderAction } from './App02';
import { ShowFooterAction } from './App03';
import { LoggedInAction } from './App04';
import { LogoutAction } from './App05';

export { default as tabChange } from './App01';
export { default as showHeader } from './App02';
export { default as showFooter } from './App03';
export { default as loggedIn } from './App04';
export { default as logout } from './App05';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface Actions {
  // タブ画面変更
  tabChange(index: number): TabChangeAction;
  /** Header Visible */
  showHeader(visible: boolean): ShowHeaderAction;
  /** Footer Visible */
  showFooter(visible: boolean): ShowFooterAction;
  /** Set loggedin status */
  loggedIn(user: CognitoUser): LoggedInAction;
  /** Set loggedin status */
  logout(): LogoutAction;
}
