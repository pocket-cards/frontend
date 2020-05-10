import { C000 } from '@models';
import { handleActions, Action } from 'redux-actions';
import { ActionTypes } from '@constants';
import { C001Payload } from '@actions/mypage';

const reducer = handleActions<C000, any>(
  {
    /** 学習履歴取得 */
    [ActionTypes.C0_01_REQUEST]: (store: C000) => store.clear().startLoading(),
    [ActionTypes.C0_01_SUCCESS]: (store: C000, { payload }: Action<C001Payload>) =>
      store.setHistory(payload.data).endLoading(),
    [ActionTypes.C0_01_FAILURE]: (store: C000) => store.endLoading(),
  },
  new C000()
);

export default reducer;
