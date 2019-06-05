import { A002RequestAction, A002SuccessAction, A002FailureAction, RemoveWordAction } from '.';
import { A0_02_REQUEST, A0_02_SUCCESS, A0_02_FAILURE } from '@constants/ActionTypes';

/** 指定単語削除 */
export const request: A002RequestAction = dispatch =>
  dispatch({
    type: A0_02_REQUEST,
  });

/** 指定単語削除 */
export const success: A002SuccessAction = word => dispatch =>
  dispatch({
    type: A0_02_SUCCESS,
    payload: {
      word,
    },
  });

/** 指定単語削除 */
export const failure: A002FailureAction = error => dispatch =>
  dispatch({
    type: A0_02_FAILURE,
    payload: error,
  });

/** 指定単語削除 */
// tslint:disable-next-line: ter-arrow-parens
const removeWord: RemoveWordAction = (word: string) => dispatch => {
  // 画像アップロード開始イベント
  dispatch(request);

  try {
    dispatch(success(word));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default removeWord;
