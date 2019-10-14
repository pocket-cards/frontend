import { App05RequestAction, App05SuccessAction, App05FailureAction, LogoutAction } from '.';
import { APP_05_REQUEST, APP_05_SUCCESS, APP_05_FAILURE } from '@constants/ActionTypes';

/** ログアウト */
export const request: App05RequestAction = dispatch =>
  dispatch({
    type: APP_05_REQUEST,
  });

/** ログアウト */
export const success: App05SuccessAction = () => dispatch =>
  dispatch({
    type: APP_05_SUCCESS,
    payload: {},
  });

/** ログアウト */
export const failure: App05FailureAction = error => dispatch =>
  dispatch({
    type: APP_05_FAILURE,
    payload: error,
  });

/** ログアウト */
// tslint:disable-next-line: ter-arrow-parens
const logout: LogoutAction = () => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success());
  } catch (err) {
    dispatch(failure(err));
  }
};

export default logout;
