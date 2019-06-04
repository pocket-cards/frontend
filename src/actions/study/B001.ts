import { History } from 'history';
import { B001RequestAction, B001SuccessAction, B001FailureAction, StartNewAction } from '.';
import { B0_01_REQUEST, B0_01_SUCCESS, B0_01_FAILURE } from '@constants/ActionTypes';
import { MODES, C006_URL, GROUP_ID } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C006Response } from 'typings/api';

/** 新規単語学習 */
export const request: B001RequestAction = dispatch =>
  dispatch({
    type: B0_01_REQUEST,
  });

/** 新規単語学習 */
export const success: B001SuccessAction = data => dispatch =>
  dispatch({
    type: B0_01_SUCCESS,
    payload: {
      mode: MODES.New,
      words: data,
    },
  });

/** 新規単語学習 */
export const failure: B001FailureAction = error => dispatch =>
  dispatch({
    type: B0_01_FAILURE,
    payload: error,
  });

/** 新規単語学習 */
const startNew: StartNewAction = (history?: History<any>) => async (dispatch, _, api) => {
  dispatch(request);

  try {
    const res = await api.get<C006Response>(C006_URL(GROUP_ID));

    // データ保存
    dispatch(success(res.data));
    // 画面遷移
    history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);
  } catch (err) {
    dispatch(failure(err));
  }
};

export default startNew;
