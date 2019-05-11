import { Record } from 'immutable';

export interface A000Props {
  words: string[];
}

export interface IA000 extends A000Props, Record<A000Props> {
  get<K extends keyof A000Props>(key: K): A000Props[K];
}

/**
 * App共通ステータス
 */
export default class A000 extends Record<A000Props>({
  words: [],
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
  clearWords() {
    return this.set('words', [] as string[]);
  }

  /**
   * 単語内部保存
   */
  setWords(words: string[]) {
    return this.set('words', words);
  }
}
