import { createAction, ActionFunction1, Action } from 'redux-actions';
import { History } from 'history';
import { B000_STUDY_START, B000_STUDY_RESULT } from '@constants/ActionTypes';
import { WordInfo } from '@models';

/** 単語学習開始 */
export const studyStart = createAction<StudyStartPayload, number>(
  B000_STUDY_START,
  history => ({
    words: [
      {
        wordId: '111',
        word: 'test',
        pronunciation: '1111',
        vocabulary: '222',
      },
    ],
  }),
);

// 単語知ってる/知らない
export const studyResult = createAction<StudyResultPayload, boolean>(
  B000_STUDY_RESULT,
  success => ({ success }),
);

/** 単語学習開始 */
export interface StudyStartPayload {
  words: WordInfo[];
}

/** 単語知ってる/知らない */
export interface StudyResultPayload {
  success: boolean;
}

/** 単語学習画面のActions */
export interface Actions {
  // 単語学習開始
  studyStart: (
    history: History<any>,
  ) => ActionFunction1<History<any>, Action<StudyStartPayload>>;

  // 単語知ってる/知らない
  studyResult: (
    success: boolean,
  ) => ActionFunction1<boolean, Action<StudyResultPayload>>;
}
