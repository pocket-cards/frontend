import { History } from 'history';
import { UploadImageAction } from './A001';
import { RemoveWordAction } from './A002';
import { RegistWordsAction } from './A003';
import { ClearAction } from './A004';

export { default as uploadImage } from './A001';
export { default as removeWord } from './A002';
export { default as registWords } from './A003';
export { default as clear } from './A004';

/** 単語登録画面のActions */
export interface Actions {
  uploadImage: (image: string, history?: History<any>) => UploadImageAction;

  // 指定単語削除
  removeWord: (word: string) => RemoveWordAction;

  // 単語一括登録
  registWords: (words: string[], history?: History<any>) => RegistWordsAction;

  // 単語クリア
  clear: () => ClearAction;
}
