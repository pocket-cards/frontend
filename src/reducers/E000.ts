import { handleActions, Action } from 'redux-actions';
import { E000 } from '@models';
import { ActionTypes } from '@constants';
import { E001Payload, E002Payload } from '@actions/group';

const reducer = handleActions<E000, any>(
  {
    /** グループ一覧 */
    [ActionTypes.E0_01_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_01_SUCCESS]: (store: E000, { payload }: Action<E001Payload>) => store.addList(payload).endLoading(),
    [ActionTypes.E0_01_FAILURE]: (store: E000) => store.endLoading(),

    /** グループ新規追加 */
    [ActionTypes.E0_02_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_02_SUCCESS]: (store: E000, { payload }: Action<E002Payload>) => store.add(payload).endLoading(),
    [ActionTypes.E0_02_FAILURE]: (store: E000) => store.endLoading(),

    /** グループ編集 */
    [ActionTypes.E0_03_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_03_SUCCESS]: (store: E000) => store.endLoading(),
    [ActionTypes.E0_03_FAILURE]: (store: E000) => store.endLoading(),
  },
  new E000()
);

export default reducer;
