import { handleActions, Action } from 'redux-actions';
import { E000 } from '@models';
import { ActionTypes } from '@constants';
import { E001Payload, E002Payload } from '@actions/group';

const reducer = handleActions<E000, any>(
  {
    /** 学習履歴取得 */
    [ActionTypes.E0_01_REQUEST]: (store: E000) => store.startLoading(),
    [ActionTypes.E0_01_SUCCESS]: (store: E000, { payload }: Action<E001Payload>) => store.addList(payload).endLoading(),
    [ActionTypes.E0_01_FAILURE]: (store: E000) => store.endLoading(),

    /** 学習履歴取得 */
    [ActionTypes.E0_02_REQUEST]: (store: E000) => store.clear().startLoading(),
    [ActionTypes.E0_02_SUCCESS]: (store: E000, { payload }: Action<E002Payload>) => store.add(payload).endLoading(),
    [ActionTypes.E0_02_FAILURE]: (store: E000) => store.endLoading(),
  },
  new E000()
);

export default reducer;
