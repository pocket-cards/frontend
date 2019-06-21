import { C001RequestAction, C001SuccessAction, C001FailureAction, HistoryAction } from '.';
import { C0_01_REQUEST, C0_01_SUCCESS, C0_01_FAILURE } from '@constants/ActionTypes';
import { A002_URL } from '@constants/Consts';
import { A002Response } from 'typings/api';

/** 学習履歴取得 */
export const request: C001RequestAction = dispatch =>
  dispatch({
    type: C0_01_REQUEST,
  });

/** 学習履歴取得 */
export const success: C001SuccessAction = data => dispatch =>
  dispatch({
    type: C0_01_SUCCESS,
    payload: data,
  });

/** 学習履歴取得 */
export const failure: C001FailureAction = error => dispatch =>
  dispatch({
    type: C0_01_FAILURE,
    payload: error,
  });

/** 学習履歴取得 */
const history: HistoryAction = () => async (dispatch, _, api) => {
  // 学習履歴取得開始イベント
  dispatch(request);

  try {
    const res = await api.get<A002Response>(A002_URL('wwalpha'));
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default history;
