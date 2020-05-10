import { ThunkActionDispatch } from 'typings/redux-thunk';
import { clear, registWords, removeWord, uploadImage } from './App';

export * as Actions from './App';
export { A001Payload, A002Payload } from './Actions';

/** 単語登録画面のActions */
export interface AppActions {
  uploadImage(image: string): ThunkActionDispatch<typeof uploadImage>;

  // 指定単語削除
  removeWord(word: string): ThunkActionDispatch<typeof removeWord>;

  // 単語一括登録
  registWords(words: string[]): ThunkActionDispatch<typeof registWords>;

  // 単語クリア
  clear(): ThunkActionDispatch<typeof clear>;
}
