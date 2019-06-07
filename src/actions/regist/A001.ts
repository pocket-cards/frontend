import { History } from 'history';
import { A001RequestAction, A001SuccessAction, A001FailureAction, UploadImageAction } from '.';
import { A0_01_REQUEST, A0_01_SUCCESS, A0_01_FAILURE } from '@constants/ActionTypes';
import { D001_URL } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { D001Request, D001Response } from 'typings/api';

/** 画像アップロード */
export const request: A001RequestAction = dispatch =>
  dispatch({
    type: A0_01_REQUEST,
  });

/** 画像アップロード */
export const success: A001SuccessAction = data => dispatch =>
  dispatch({
    type: A0_01_SUCCESS,
    payload: data,
  });

/** 画像アップロード */
export const failure: A001FailureAction = error => dispatch =>
  dispatch({
    type: A0_01_FAILURE,
    payload: error,
  });

/** 画像アップロード */
const uploadImage: UploadImageAction = (type: string, image: string, history?: History<any>) => async (dispatch, _, api) => {
  const imageSrc = image.replace(/^.*,/, '');

  // 画像アップロード開始イベント
  dispatch(request);

  // 画面遷移
  history && history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]);

  try {
    const res = await api.post<D001Response>(D001_URL(), {
      type,
      image: imageSrc,
    } as D001Request);

    // データ保存
    dispatch(success(res.data));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default uploadImage;
