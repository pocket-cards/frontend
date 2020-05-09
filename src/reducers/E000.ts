import { handleActions, Action } from 'redux-actions';
import { E000 } from '@models';
import {
  E0_01_REQUEST,
  E0_01_SUCCESS,
  E0_01_FAILURE,
  E0_02_REQUEST,
  E0_02_SUCCESS,
  E0_02_FAILURE,
} from '@constants/ActionTypes';
import { E001Payload, E002Payload } from '@actions/group';

const reducer = handleActions<E000, any>(
  {
    /** 学習履歴取得 */
    [E0_01_REQUEST]: (store: E000) => store.startLoading(),
    [E0_01_SUCCESS]: (store: E000, { payload }: Action<E001Payload>) => store.addList(payload).endLoading(),
    [E0_01_FAILURE]: (store: E000) => store.endLoading(),

    /** 学習履歴取得 */
    [E0_02_REQUEST]: (store: E000) => store.clear().startLoading(),
    [E0_02_SUCCESS]: (store: E000, { payload }: Action<E002Payload>) => store.add(payload).endLoading(),
    [E0_02_FAILURE]: (store: E000) => store.endLoading(),
  },
  new E000()
);

export default reducer;
