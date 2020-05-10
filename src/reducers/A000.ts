import { handleActions, Action } from 'redux-actions';
import { A000 } from '@models';
import { ActionTypes } from '@constants';
import { A001Payload, A002Payload } from '@actions/regist';

const reducer = handleActions<any>(
  {
    [ActionTypes.A0_01_REQUEST]: (store: A000) => store.startLoading(),
    [ActionTypes.A0_01_SUCCESS]: (store: A000, { payload: { data } }: Action<A001Payload>) =>
      store.setWords(data).endLoading(),
    [ActionTypes.A0_01_FAILURE]: (store: A000) => store.endLoading(),

    [ActionTypes.A0_02_REQUEST]: (store: A000) => store.startLoading(),
    [ActionTypes.A0_02_SUCCESS]: (store: A000, { payload: { word } }: Action<A002Payload>) =>
      store.removeWord(word).endLoading(),
    [ActionTypes.A0_02_FAILURE]: (store: A000) => store.endLoading(),

    [ActionTypes.A0_03_REQUEST]: (store: A000) => store.startLoading(),
    [ActionTypes.A0_03_SUCCESS]: (store: A000) => store.clear().endLoading(),
    [ActionTypes.A0_03_FAILURE]: (store: A000) => store.endLoading(),

    [ActionTypes.A0_04_REQUEST]: (store: A000) => store,
    [ActionTypes.A0_04_SUCCESS]: (store: A000) => store.clear(),
    [ActionTypes.A0_04_FAILURE]: (store: A000) => store,
  },
  new A000()
);

export default reducer;
