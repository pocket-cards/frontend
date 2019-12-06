import { handleActions, Action } from 'redux-actions';
import { A000 } from '@models';
import {
  A0_01_REQUEST,
  A0_01_SUCCESS,
  A0_01_FAILURE,
  A0_02_REQUEST,
  A0_02_SUCCESS,
  A0_02_FAILURE,
  A0_03_REQUEST,
  A0_03_SUCCESS,
  A0_03_FAILURE,
  A0_04_REQUEST,
  A0_04_SUCCESS,
  A0_04_FAILURE
} from '@constants/ActionTypes';
import { A001Payload, A002Payload } from '@actions/regist';

const reducer = handleActions<any>(
  {
    [A0_01_REQUEST]: (store: A000) => store.startLoading(),
    [A0_01_SUCCESS]: (store: A000, { payload: { data } }: Action<A001Payload>) => store.setWords(data).endLoading(),
    [A0_01_FAILURE]: (store: A000) => store.endLoading(),

    [A0_02_REQUEST]: (store: A000) => store.startLoading(),
    [A0_02_SUCCESS]: (store: A000, { payload: { word } }: Action<A002Payload>) => store.removeWord(word).endLoading(),
    [A0_02_FAILURE]: (store: A000) => store.endLoading(),

    [A0_03_REQUEST]: (store: A000) => store.startLoading(),
    [A0_03_SUCCESS]: (store: A000) => store.clear().endLoading(),
    [A0_03_FAILURE]: (store: A000) => store.endLoading(),

    [A0_04_REQUEST]: (store: A000) => store,
    [A0_04_SUCCESS]: (store: A000) => store.clear(),
    [A0_04_FAILURE]: (store: A000) => store
  },
  new A000()
);

export default reducer;
