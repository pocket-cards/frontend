import { History } from 'history';
import { B007RequestAction, B007SuccessAction, B007FailureAction, StartTestAction } from '.';
import { MODES, GROUP_ID, C007_URL } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C007Response } from 'typings/api';
import { B0_07_REQUEST, B0_07_SUCCESS, B0_07_FAILURE } from '@constants/ActionTypes';

/** 単語テスト */
export const request: B007RequestAction = dispatch =>
  dispatch({
    type: B0_07_REQUEST,
  });

/** 単語テスト */
export const success: B007SuccessAction = data => dispatch =>
  dispatch({
    type: B0_07_SUCCESS,
    payload: {
      mode: MODES.AllTest,
      words: data,
    },
  });

/** 単語テスト */
export const failure: B007FailureAction = error => dispatch =>
  dispatch({
    type: B0_07_FAILURE,
    payload: error,
  });

/** 単語テスト */
// tslint:disable-next-line: ter-arrow-parens
const startTest: StartTestAction = (history?: History<any>) => async (dispatch, _, api) => {
  // 既存単語クリア
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]);

  try {
    const res = await api.get<C007Response>(C007_URL(GROUP_ID));

    // データ保存
    dispatch(success(res.words));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default startTest;
