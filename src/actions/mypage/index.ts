import { HistoryAction } from './C001';

export { default as history, C001Payload } from './C001';
// export { default as removeWord } from './A002';
// export { default as registWords } from './A003';
// export { default as clear } from './A004';

/** 個人画面のActions */
export interface Actions {
  /** 学習履歴取得 */
  history(): HistoryAction;

  // 指定単語削除
  // removeWord: (word: string) => RemoveWordAction;

  // // 単語一括登録
  // registWords: (words: string[], history?: History<any>) => RegistWordsAction;

  // clear: () => ClearAction;
}

/** 学習履歴取得 */
