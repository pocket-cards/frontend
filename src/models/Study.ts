import { Record } from 'immutable';

export type WordInfo = {
  // 単語
  word: string;
  // 発音記号
  pronounce?: string;
  // 語彙（中国語）
  vocChn?: string;
  // 語彙（日本語）
  vocJpn?: string;
  // 音声ファイル
  mp3?: string;
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
    return this.set('words', words)
      .set('current', words[0])
      .set('index', 0);
  }

  /** 次の単語を表示する */
  next() {
    const newIdx = this.index + 1 === this.words.length ? this.index : this.index + 1;

    return this.set('current', this.words[newIdx]).set('index', newIdx);
  }

  /** 学習セットリトライ */
  retry() {
    const newIdx = 0;

    return this.set('index', newIdx).set('current', this.words[newIdx]);
  }

  /** テスト回答(YES/NO) */
  answer(mode: string, yes: boolean) {
    if (!yes) {
      return this.next();
    }

    const words = this.words.splice(this.index, 0);

    // 学習終了
    if (words.length === 0) {
      return this.set('words', []).set('current', undefined);
    }

    // 次の単語
    return this.set('words', words).set('current', words[this.index]);
  }
}
