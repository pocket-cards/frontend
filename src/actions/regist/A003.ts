import { History } from 'history';
import { A003RequestAction, A003SuccessAction, A003FailureAction, RegistWordsAction } from '.';
import { A0_03_REQUEST, A0_03_SUCCESS, A0_03_FAILURE } from '@constants/ActionTypes';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { C001_URL, GROUP_ID } from '@constants/Consts';
import { C001Response, C001Request } from 'typings/api';

/** 画像アップロード */
export const request: A003RequestAction = dispatch =>
  dispatch({
    type: A0_03_REQUEST,
  });

/** 画像アップロード */
export const success: A003SuccessAction = () => dispatch =>
  dispatch({
    type: A0_03_SUCCESS,
  });

/** 画像アップロード */
export const failure: A003FailureAction = error => dispatch =>
  dispatch({
    type: A0_03_FAILURE,
    payload: error,
  });

/** 画像アップロード */
// tslint:disable-next-line: ter-arrow-parens
const registWords: RegistWordsAction = (words: string[], history?: History<any>) => async (dispatch, _, api) => {
  try {
    // 画像アップロード開始イベント
    dispatch(request);

    await api.post(C001_URL(GROUP_ID), {
      words,
    } as C001Request);

    // データ保存
    dispatch(success());
  } catch (err) {
    dispatch(failure(err));
  } finally {
    // 画面遷移
    history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]);
  }
};

export default registWords;
