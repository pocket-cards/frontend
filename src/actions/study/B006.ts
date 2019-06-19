import { History } from 'history';
import { B006RequestAction, B006SuccessAction, B006FailureAction, StartReviewAction } from '.';
import { MODES, GROUP_ID, C008_URL } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C008Response } from 'typings/api';
import { B0_06_REQUEST, B0_06_SUCCESS, B0_06_FAILURE } from '@constants/ActionTypes';

/** 単語復習 */
export const request: B006RequestAction = dispatch =>
  dispatch({
    type: B0_06_REQUEST,
  });

/** 単語復習 */
export const success: B006SuccessAction = data => dispatch =>
  dispatch({
    type: B0_06_SUCCESS,
    payload: {
      mode: MODES.Review,
      words: data,
    },
  });

/** 単語復習 */
export const failure: B006FailureAction = error => dispatch =>
  dispatch({
    type: B0_06_FAILURE,
    payload: error,
  });

/** 単語復習 */
// tslint:disable-next-line: ter-arrow-parens
const startReview: StartReviewAction = (history?: History<any>) => async (dispatch, _, api) => {
  // 既存単語クリア
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

  try {
    const res = await api.get<C008Response>(C008_URL(GROUP_ID));

    // データ保存
    dispatch(success(res.words));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default startReview;
