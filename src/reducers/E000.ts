import { handleActions, Action } from 'redux-actions';
import { E000 } from '@models';
import { ActionTypes } from '@constants';
import { E001Payload, E002Payload, E004Payload } from '@actions/group';
import { E005Payload } from '@actions/word';
import { E008Payload, E006Payload } from '@actions/word/Actions';

const reducer = handleActions<E000, any>(
  {
    /** グループ一覧 */
    [ActionTypes.E0_01_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_01_SUCCESS]: (store: E000, { payload }: Action<E001Payload>) =>
      store.addGroupList(payload).endLoading(),
    [ActionTypes.E0_01_FAILURE]: (store: E000) => store.endLoading(),

    /** グループ新規追加 */
    [ActionTypes.E0_02_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_02_SUCCESS]: (store: E000, { payload }: Action<E002Payload>) =>
      store.addGroup(payload).endLoading(),
    [ActionTypes.E0_02_FAILURE]: (store: E000) => store.endLoading(),

    /** グループ編集 */
    [ActionTypes.E0_03_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_03_SUCCESS]: (store: E000) => store.endLoading(),
    [ActionTypes.E0_03_FAILURE]: (store: E000) => store.endLoading(),

    /** グループ削除 */
    [ActionTypes.E0_04_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_04_SUCCESS]: (store: E000, { payload }: Action<E004Payload>) =>
      store.delGroup(payload).endLoading(),
    [ActionTypes.E0_04_FAILURE]: (store: E000) => store.endLoading(),

    /** 単語リスト追加 */
    [ActionTypes.E0_05_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_05_SUCCESS]: (store: E000, { payload }: Action<E005Payload>) =>
      store.addWordList(payload).endLoading(),
    [ActionTypes.E0_05_FAILURE]: (store: E000) => store.endLoading(),

    /** 単語詳細取得 */
    [ActionTypes.E0_06_REQUEST]: (store: E000) => store.clearWordDetail().startLoading(),
    [ActionTypes.E0_06_SUCCESS]: (store: E000, { payload }: Action<E006Payload>) =>
      store.setWordDetail(payload).endLoading(),
    [ActionTypes.E0_06_FAILURE]: (store: E000) => store.endLoading(),

    /** 単語削除 */
    [ActionTypes.E0_08_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_08_SUCCESS]: (store: E000, { payload }: Action<E008Payload>) => store.delWord(payload).endLoading(),
    [ActionTypes.E0_08_FAILURE]: (store: E000) => store.endLoading(),
  },
  new E000()
);

export default reducer;
