import { Record } from 'immutable';

export type WordInfo = {
  // ID
  wordId: string;
  // 単語
  word: string;
  // 発音
  pronunciation: string;
  // 語彙
  vocabulary: string;
};

export interface B000UIProps {
  current?: WordInfo;
}

export interface B000Props extends B000UIProps {
  words: WordInfo[];
  index: number;
}

export interface IB000 extends B000Props, Record<B000Props> {
  get<K extends keyof B000UIProps>(key: K): B000UIProps[K];
}

/**
 * 単語学習の情報
 */
export default class B000 extends Record<B000Props>({
  words: [],
  index: 0,
  current: undefined,
}) {
  /**
   * 単語情報を登録する
   */
  setWords(words: WordInfo[]) {
    return this.set('words', words).set('current', words[0]);
  }

  /**
   * 知ってる場合、単語を削除する
   */
  success() {
    console.log(123456);
    if (this.words.length === 1) {
      return this.set('words', []).set('current', undefined);
    }

    const words = this.words.splice(this.index, 0);
    console.log(words, 111);
    return this.set('words', words).set('current', words[this.index]);
  }

  /**
   * 知らない場合、次の単語に進む
   */
  failure() {
    const newIdx = this.index === this.words.length - 1 ? 0 : this.index + 1;
    return this.set('index', newIdx).set('current', this.words[newIdx]);
  }
}
