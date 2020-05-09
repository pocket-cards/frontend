import groupList from './E001';
import groupRegist from './E002';

import { ThunkActionDispatch } from 'typings/redux-thunk';

export { default as groupList, E001Payload } from './E001';
export { default as groupRegist, E002Payload } from './E002';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface Actions {
  // グループ一覧取得
  groupList(): ThunkActionDispatch<typeof groupList>;
  /** Header Visible */
  groupRegist(name: string, description?: string): ThunkActionDispatch<typeof groupRegist>;
}
