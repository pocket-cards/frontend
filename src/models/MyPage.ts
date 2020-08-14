import { Record } from 'immutable';
import { A002Response } from 'typings/api';

export interface C000UIProps {
  remainingTest: number;
  remainingReview: number;
  daily: number;
  dailyNew: number;
  dailyReview: number;
  weekly: number;
  monthly: number;
  isLoading: boolean;
}

export interface C000Props extends C000UIProps {}

export interface IC000 extends C000Props, Record<C000Props> {
  get<K extends keyof C000UIProps>(key: K): C000UIProps[K];
}

/**
 * 個人情報
 */
export default class C000 extends Record<C000Props>({
  remainingTest: 0,
  remainingReview: 0,
  daily: 0,
  dailyNew: 0,
  dailyReview: 0,
  weekly: 0,
  monthly: 0,
  isLoading: false,
}) {
  /**
   * 学習履歴取得
   */
  setHistory(info: A002Response) {
    // モード変わった、或いは、既存データ存在しない
    return this.set('remainingReview', info.remaining.review)
      .set('remainingTest', info.remaining.test)
      .set('daily', info.daily.total)
      .set('dailyNew', info.daily.new)
      .set('dailyReview', info.daily.review)
      .set('weekly', info.weekly)
      .set('monthly', info.monthly);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
