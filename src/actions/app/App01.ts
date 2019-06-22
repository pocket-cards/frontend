import { App01RequestAction, App01SuccessAction, App01FailureAction, TabChangeThunkAction, TabChangeAction } from '.';
import { APP_01_REQUEST, APP_01_SUCCESS, APP_01_FAILURE } from '@constants/ActionTypes';

/** タブ変更 */
export const request: App01RequestAction = dispatch =>
  dispatch({
    type: APP_01_REQUEST,
  });

/** タブ変更 */
export const success: App01SuccessAction = index => dispatch =>
  dispatch({
    type: APP_01_SUCCESS,
    payload: { index },
  });

/** タブ変更 */
export const failure: App01FailureAction = error => dispatch =>
  dispatch({
    type: APP_01_FAILURE,
    payload: error,
  });

/** タブ変更 */
const tabChange: TabChangeAction = (index: number) => async (dispatch, _, api) => {
  dispatch(request);

  try {
    // データ保存
    dispatch(success(index));
  } catch (err) {
    dispatch(failure(err));
  }
};

export default tabChange;
