import { ThunkActionDispatch } from 'typings/redux-thunk';
import { list } from './App';
export * as Actions from './App';
export { E005Payload } from './Actions';

// ------------------------------
// TypeScript Definetion
// ------------------------------
export interface WordActions {
  /** 単語リスト取得 */
  list(): ThunkActionDispatch<typeof list>;
}
