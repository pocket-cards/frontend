import { App03RequestAction, App03SuccessAction, App03FailureAction, ShowFooterAction } from '.';
import { APP_03_REQUEST, APP_03_SUCCESS, APP_03_FAILURE } from '@constants/ActionTypes';

/** バー表示制御 */
export const request: App03RequestAction = dispatch =>
  dispatch({
    type: APP_03_REQUEST,
  });

/** バー表示制御 */
export const success: App03SuccessAction = visible => dispatch =>
  dispatch({
    type: APP_03_SUCCESS,
    payload: { visible },
  });

/** バー表示制御 */
export const failure: App03FailureAction = error => dispatch =>
  dispatch({
    type: APP_03_FAILURE,
    payload: error,
  });

/** バー表示制御 */
// tslint:disable-next-line: ter-arrow-parens
const showFooter: ShowFooterAction = (visible: boolean) => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(visible));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default showFooter;
