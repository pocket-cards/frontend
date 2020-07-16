import { ThunkActionDispatch } from 'typings/redux-thunk';
import { list, regist, del } from './App';

export * as Actions from './App';
export { E001Payload, E002Payload } from './Actions';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface GroupActions {
  // グループ一覧取得
  list(): ThunkActionDispatch<typeof list>;
  /** Header Visible */
  regist(name: string, description?: string): ThunkActionDispatch<typeof regist>;
  // グループ削除
  delete(): ThunkActionDispatch<typeof del>;
}
