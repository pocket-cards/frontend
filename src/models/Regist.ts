import { Record } from 'immutable';

export interface A000Props {
  words: string[];
  isLoading: boolean;
}

export interface IA000 extends A000Props, Record<A000Props> {
  get<K extends keyof A000Props>(key: K): A000Props[K];
}

/**
 * App共通ステータス
 */
export default class A000 extends Record<A000Props>({
  words: [],
  isLoading: false,
}) {
  /**
   * 登録しない単語を削除する
   */
  removeWord(word: string) {
    const result = this.get('words').filter(item => item !== word);

    return this.set('words', result);
  }

  /**
   * 臨時単語リストをクリアする
   */
  clear() {
    return this.set('words', []);
  }

  /**
   * 単語内部保存
   */
  setWords(words: string[]) {
    return this.set('words', words);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
