import { Record } from 'immutable';
import { WordItem } from 'typings/api';
import { MODES, PAGE_MAX_WORDS } from '@constants/Consts';
import * as _ from 'lodash';

export type WordInfo = WordItem;

export interface B000UIProps {
  current?: WordInfo;
  mode?: string;
  isLoading: boolean;
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
  mode: undefined,
  isLoading: false,
}) {
  /**
   * 単語情報を登録する
   */
  setWords(mode: string, words: WordInfo[]) {
    // 差分を抽出する
    const differ = _.differenceBy(words, this.words, 'word');
    // 足りない単語数を計算する
    const diffNum = PAGE_MAX_WORDS - this.words.length;
    // 既存配列と合併する
    const newArray = _.concat(this.words, differ.splice(0, diffNum));

    // console.log(this.words);
    // console.log(words);
    // console.log(differ, differ.length);
    // console.log(diffNum);
    // console.log(differ.splice(0, diffNum));
    // console.log(newArray);

    // モード変わった、或いは、既存データ存在しない
    return this.set('words', newArray)
      .set('current', this.current ? this.current : newArray[0])
      .set('index', this.index)
      .set('mode', mode);
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

  /** テスト回答(YES/NO) */
  answer(yes: boolean) {
    if (!yes && this.mode !== MODES.AllTest) {
      return this.next();
    }

    console.log(this.index);

    // 該当単語を削除する
    this.words.splice(this.index, 1);
    console.log(this.words);

    // Indexが配列の限界を超えた場合、最初から始まる
    const newIdx = this.index >= this.words.length ? 0 : this.index;

    console.log(newIdx);

    return this.set('words', this.words)
      .set('index', newIdx)
      .set('current', this.words[newIdx]);
  }

  /** 既存単語をクリアする */
  clear() {
    return this.set('words', []).set('current', undefined);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
