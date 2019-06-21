import { C000 } from '@models';
import { handleActions, Action } from 'redux-actions';
import { C0_01_REQUEST, C0_01_SUCCESS, C0_01_FAILURE } from '@constants/ActionTypes';
import { C001_SUCCESS_PAYLOAD } from '@actions/mypage';

const reducer = handleActions<C000, any>(
  {
    /** 学習履歴取得 */
    [C0_01_REQUEST]: (store: C000) => store.clear().startLoading(),
    [C0_01_SUCCESS]: (store: C000, { payload }: Action<C001_SUCCESS_PAYLOAD>) => store.setHistory(payload).endLoading(),
    [C0_01_FAILURE]: (store: C000) => store.endLoading(),
  },
  new C000(),
);

export default reducer;
