import { Record } from 'immutable';
import { C004Request } from 'typings/api';

export type WordInfo = C004Request;

export interface B000UIProps {
  current?: WordInfo;
  mode?: string;
}

export interface B000Props extends B000UIProps {
  words: WordInfo[];
  index: number;
  getNext: boolean;
}

export interface IB000 extends B000Props, Record<B000Props> {
  get<K extends keyof B000UIProps>(key: K): B000UIProps[K];
  getMore(): boolean;
}

/**
 * 単語学習の情報
 */
export default class B000 extends Record<B000Props>({
  words: [],
  index: 0,
  current: undefined,
  mode: undefined,
  getNext: false,
}) {
  /**
   * 単語情報を登録する
   */
  setWords(mode: string, words: WordInfo[]) {
    console.log(mode, words);
    // 単語追加の場合
    if (mode === this.mode && words.length === 0) {
      return this.set('getNext', false);
    }

    // モード変換の場合、単語リセットする
    if (mode !== this.mode) {
      return this.set('words', words)
        .set('current', words[0])
        .set('index', 0)
        .set('mode', mode)
        .set('getNext', true);
    }

    const newWords = [...this.words, ...words];

    return this.set('words', newWords);
  }

  /** 次の単語を表示する */
  next() {
    const newIdx = this.index + 1 === this.words.length ? 0 : this.index + 1;

    console.log(this.words);
    // １件のみ場合、計算しない
    if (this.words.length === 1) {
      return this;
    }

    // 単語ループ表示する
    return this.set('current', this.words[newIdx]).set('index', newIdx);
  }

  /** 学習セットリトライ */
  retry() {
    const newIdx = 0;

    return this.set('index', newIdx).set('current', this.words[newIdx]);
  }

  /** テスト回答(YES/NO) */
  answer(yes: boolean) {
    if (!yes) {
      return this.next();
    }

    console.log(this.index);

    // 該当単語を削除する
    this.words.splice(this.index, 1);

    // １件のみの場合、そのまま表示
    const newIdx = this.words.length === 1 ? 0 : this.index - 1;

    return this.set('words', this.words)
      .set('index', newIdx)
      .set('current', this.words[newIdx]);
  }

  /** 新規単語検索追加判断条件 */
  getMore() {
    if (!this.getNext) return false;

    // ５件以下の場合、追加する
    if (this.words.length <= 5) return true;
  }
}
