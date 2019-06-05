import { B000 } from '@models';
import { handleActions, Action } from 'redux-actions';
import { B001_SUCCESS_PAYLOAD, B006_SUCCESS_PAYLOAD, B007_SUCCESS_PAYLOAD, B004_SUCCESS_PAYLOAD } from '@actions/study';
import {
  B0_01_REQUEST,
  B0_01_SUCCESS,
  B0_01_FAILURE,
  B0_04_REQUEST,
  B0_04_SUCCESS,
  B0_04_FAILURE,
  B0_06_REQUEST,
  B0_06_SUCCESS,
  B0_06_FAILURE,
  B0_07_REQUEST,
  B0_07_SUCCESS,
  B0_07_FAILURE,
} from '@constants/ActionTypes';

const reducer = handleActions<B000, any>(
  {
    /** 新規単語 */
    [B0_01_REQUEST]: (store: B000) => store,
    [B0_01_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B001_SUCCESS_PAYLOAD>) => store.setWords(mode, words),
    [B0_01_FAILURE]: (store: B000) => store,

    /** 次の単語 */
    // [B0_02_REQUEST]: (store: B000) => store,
    // [B0_02_SUCCESS]: (store: B000) => store.next(),
    // [B0_02_FAILURE]: (store: B000) => store,

    /** 単語セットのリトライ */
    // [B0_03_REQUEST]: (store: B000) => store,
    // [B0_03_SUCCESS]: (store: B000) => store.retry(),
    // [B0_03_FAILURE]: (store: B000) => store,

    /** テスト回答(YES/NO) */
    [B0_04_REQUEST]: (store: B000) => store,
    [B0_04_SUCCESS]: (store: B000, { payload: { yes } }: Action<B004_SUCCESS_PAYLOAD>) => store.answer(yes),
    [B0_04_FAILURE]: (store: B000) => store,

    /** 単語テスト（当日） */
    // [B0_05_REQUEST]: (store: B000) => store,
    // [B0_05_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B005_SUCCESS_PAYLOAD>) => store.setWords(mode, words),
    // [B0_05_FAILURE]: (store: B000) => store,

    /** 単語復習開始 */
    [B0_06_REQUEST]: (store: B000) => store,
    [B0_06_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B006_SUCCESS_PAYLOAD>) => store.setWords(mode, words),
    [B0_06_FAILURE]: (store: B000) => store,

    /** 単語テスト（全部） */
    [B0_07_REQUEST]: (store: B000) => store,
    [B0_07_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B007_SUCCESS_PAYLOAD>) => store.setWords(mode, words),
    [B0_07_FAILURE]: (store: B000) => store,
  },
  new B000(),
);

export default reducer;
