import { History } from 'history';
import { AnswerAction } from './B004';
import { StartReviewAction } from './B006';
import { StartTestAction } from './B007';

export { default as startNew } from './B001';
export { default as answer } from './B004';
export { default as startReview } from './B006';
export { default as startTest } from './B007';

// ------------------------------
// TypeScript Definetion
// ------------------------------

/** 単語学習画面のActions */
export interface Actions {
  /** 新規単語学習 */
  startNew: (history: History<any>) => void;
  /** テスト回答(YES/NO) */
  answer: (word: string, yes: boolean) => AnswerAction;
  /** 単語復習 */
  startReview: (history: History<any>) => StartReviewAction;
  /** 単語テスト（全部）*/
  startTest: (history: History<any>) => StartTestAction;
}
