import { App04RequestAction, App04SuccessAction, App04FailureAction, ShowFooterAction, SetLoggedInAction } from '.';
import { APP_04_REQUEST, APP_04_SUCCESS, APP_04_FAILURE } from '@constants/ActionTypes';

/** ログイン状態変更 */
export const request: App04RequestAction = dispatch =>
  dispatch({
    type: APP_04_REQUEST,
  });

/** ログイン状態変更 */
export const success: App04SuccessAction = loggedin => dispatch =>
  dispatch({
    type: APP_04_SUCCESS,
    payload: { loggedin },
  });

/** ログイン状態変更 */
export const failure: App04FailureAction = error => dispatch =>
  dispatch({
    type: APP_04_FAILURE,
    payload: error,
  });

/** ログイン状態変更 */
// tslint:disable-next-line: ter-arrow-parens
const setLoggedIn: SetLoggedInAction = (loggedin: boolean) => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(loggedin));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default setLoggedIn;
