import { App02RequestAction, App02SuccessAction, App02FailureAction, TabChangeThunkAction, TabChangeAction, ShowHeaderAction } from '.';
import { APP_02_REQUEST, APP_02_SUCCESS, APP_02_FAILURE } from '@constants/ActionTypes';

/** バー表示制御 */
export const request: App02RequestAction = dispatch =>
  dispatch({
    type: APP_02_REQUEST,
  });

/** バー表示制御 */
export const success: App02SuccessAction = visible => dispatch =>
  dispatch({
    type: APP_02_SUCCESS,
    payload: { visible },
  });

/** バー表示制御 */
export const failure: App02FailureAction = error => dispatch =>
  dispatch({
    type: APP_02_FAILURE,
    payload: error,
  });

/** バー表示制御 */
// tslint:disable-next-line: ter-arrow-parens
const showHeader: ShowHeaderAction = (visible: boolean) => async dispatch => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(visible));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default showHeader;
