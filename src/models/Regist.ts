import { Record } from 'immutable';

export interface RegistProps {
  words: string[];
}

export interface IRegist extends RegistProps, Record<RegistProps> {
  get<K extends keyof RegistProps>(key: K): RegistProps[K];
}

/**
 * App共通ステータス
 */
export default class Regist extends Record<RegistProps>({
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
   * 単語内部保存
   */
  setWords(words: string[]) {
    return this.set('words', words);
  }
}
