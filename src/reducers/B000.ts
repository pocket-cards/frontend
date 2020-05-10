import { B000 } from '@models';
import { handleActions, Action } from 'redux-actions';
import { B001Payload, B006Payload, B004Payload, B007Payload } from '@actions/study';
import { ActionTypes } from '@constants';

const reducer = handleActions<B000, any>(
  {
    /** 新規単語 */
    [ActionTypes.B0_01_REQUEST]: (store: B000) => store.clear().startLoading(),
    [ActionTypes.B0_01_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B001Payload>) =>
      store.setWords(mode, words).endLoading(),
    [ActionTypes.B0_01_FAILURE]: (store: B000) => store.endLoading(),

    /** 次の単語 */
    // [B0_02_REQUEST]: (store: B000) => store,
    // [B0_02_SUCCESS]: (store: B000) => store.next(),
    // [B0_02_FAILURE]: (store: B000) => store,

    /** 単語セットのリトライ */
    // [B0_03_REQUEST]: (store: B000) => store,
    // [B0_03_SUCCESS]: (store: B000) => store.retry(),
    // [B0_03_FAILURE]: (store: B000) => store,

    /** テスト回答(YES/NO) */
    [ActionTypes.B0_04_REQUEST]: (store: B000) => store,
    [ActionTypes.B0_04_SUCCESS]: (store: B000, { payload: { yes } }: Action<B004Payload>) => store.answer(yes),
    [ActionTypes.B0_04_FAILURE]: (store: B000) => store,

    /** 単語テスト（当日） */
    // [B0_05_REQUEST]: (store: B000) => store,
    // [B0_05_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B005_SUCCESS_PAYLOAD>) => store.setWords(mode, words),
    // [B0_05_FAILURE]: (store: B000) => store,

    /** 単語復習 */
    [ActionTypes.B0_06_REQUEST]: (store: B000) => store.clear().startLoading(),
    [ActionTypes.B0_06_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B006Payload>) =>
      store.setWords(mode, words).endLoading(),
    [ActionTypes.B0_06_FAILURE]: (store: B000) => store.endLoading(),

    /** 単語テスト */
    [ActionTypes.B0_07_REQUEST]: (store: B000) => store.clear().startLoading(),
    [ActionTypes.B0_07_SUCCESS]: (store: B000, { payload: { mode, words } }: Action<B007Payload>) =>
      store.setWords(mode, words).endLoading(),
    [ActionTypes.B0_07_FAILURE]: (store: B000) => store.endLoading(),
  },
  new B000()
);

export default reducer;
