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
} from '@constants/ActionTypes';

const reducer = handleActions<any>(
  {
    [A0_01_REQUEST]: (store: A000) => store,
    [A0_01_SUCCESS]: (store: A000) => store,
    [A0_01_FAILURE]: (store: A000) => store,

    [A0_02_REQUEST]: (store: A000) => store,
    [A0_02_SUCCESS]: (store: A000) => store,
    [A0_02_FAILURE]: (store: A000) => store,

    [A0_03_REQUEST]: (store: A000) => store,
    [A0_03_SUCCESS]: (store: A000) => store,
    [A0_03_FAILURE]: (store: A000) => store,
  },
  new A000(),
);

export default reducer;
