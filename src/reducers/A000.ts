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
  A0_04_FAILURE,
} from '@constants/ActionTypes';
import { A001_SUCCESS_PAYLOAD, A002_SUCCESS_PAYLOAD } from '@actions/regist';

const reducer = handleActions<any>(
  {
    [A0_01_REQUEST]: (store: A000) => store.startLoading(),
    [A0_01_SUCCESS]: (store: A000, action: Action<A001_SUCCESS_PAYLOAD>) => store.setWords(action.payload).endLoading(),
    [A0_01_FAILURE]: (store: A000) => store.endLoading(),

    [A0_02_REQUEST]: (store: A000) => store.endLoading(),
    [A0_02_SUCCESS]: (store: A000, action: Action<A002_SUCCESS_PAYLOAD>) => store.removeWord(action.payload.word).endLoading(),
    [A0_02_FAILURE]: (store: A000) => store.endLoading(),

    [A0_03_REQUEST]: (store: A000) => store.endLoading(),
    [A0_03_SUCCESS]: (store: A000) => store.clear().endLoading(),
    [A0_03_FAILURE]: (store: A000) => store.endLoading(),

    [A0_04_REQUEST]: (store: A000) => store,
    [A0_04_SUCCESS]: (store: A000) => store.clear(),
    [A0_04_FAILURE]: (store: A000) => store,
  },
  new A000(),
);

export default reducer;
