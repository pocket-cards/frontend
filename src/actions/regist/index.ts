import { createAction, ActionFunction1, Action } from 'redux-actions';
import {
  A000_UPLOAD_IMAGE,
  A000_REMOVE_WORD,
  A000_REGIST_WORDS,
} from '@constants/ActionTypes';

/** 画像アップロード */
export const uploadImage = createAction<UploadImagePayload, number>(
  A000_UPLOAD_IMAGE,
  index => ({ words: ['test', 'america', 'english'] }),
);

/** 画面から単語を削除する */
export const removeWord = createAction<RemoveWordPayload, string>(
  A000_REMOVE_WORD,
  word => ({ word }),
);

/** 単語一括登録 */
export const registWords = createAction<RegistWordsPayload, string[]>(
  A000_REGIST_WORDS,
  words => ({ words }),
);

/** 画像アップロード */
export interface UploadImagePayload {
  words: string[];
}

/** 単語削除 */
export interface RemoveWordPayload {
  word: string;
}

/** 単語一括登録 */
export interface RegistWordsPayload {
  words: string[];
}

/** 単語登録画面のActions */
export interface Actions {
  // 画像アップロード
  uploadImage: (
    index: number,
  ) => ActionFunction1<number, Action<UploadImagePayload>>;

  // 指定単語削除
  removeWord: (
    word: string,
  ) => ActionFunction1<string, Action<RemoveWordPayload>>;

  // 単語一括登録
  registWords: (
    words: string[],
  ) => ActionFunction1<string[], Action<RegistWordsPayload>>;
}
