import { E0_01_REQUEST, E0_01_SUCCESS, E0_01_FAILURE } from '@constants/ActionTypes';
import { B002_URL } from '@constants/Consts';
import { B002Response } from 'typings/api';
import { E001RequestAction, E001SuccessAction, E001FailureAction, GroupListAction } from '.';

/** 画像アップロード */
export const request: E001RequestAction = dispatch =>
  dispatch({
    type: E0_01_REQUEST,
  });

/** 画像アップロード */
export const success: E001SuccessAction = data => dispatch =>
  dispatch({
    type: E0_01_SUCCESS,
    payload: data,
  });

/** 画像アップロード */
export const failure: E001FailureAction = error => dispatch =>
  dispatch({
    type: E0_01_FAILURE,
    payload: error,
  });

/** グループ一覧 */
const groupList: GroupListAction = () => async (dispatch, store, api) => {
  // 画像アップロード開始イベント
  dispatch(request);
  const user = store()
    .get('App')
    .get('user');

  if (!user) return;

  try {
    const res = await api.get<B002Response>(B002_URL(user.getUsername()));
    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default groupList;
