import list from './E001';
import regist from './E002';

import { ThunkActionDispatch } from 'typings/redux-thunk';

export { default as list, E001Payload } from './E001';
export { default as regist, E002Payload } from './E002';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface Actions {
  // グループ一覧取得
  list(): ThunkActionDispatch<typeof list>;
  /** Header Visible */
  regist(name: string, description?: string): ThunkActionDispatch<typeof regist>;
}
