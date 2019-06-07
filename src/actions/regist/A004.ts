import { A004RequestAction, A004SuccessAction, A004FailureAction, RemoveWordAction, ClearAction } from '.';
import { A0_04_REQUEST, A0_04_SUCCESS, A0_04_FAILURE } from '@constants/ActionTypes';

/** 単語クリア */
export const request: A004RequestAction = dispatch =>
  dispatch({
    type: A0_04_REQUEST,
  });

/** 単語クリア */
export const success: A004SuccessAction = dispatch =>
  dispatch({
    type: A0_04_SUCCESS,
  });

/** 単語クリア */
export const failure: A004FailureAction = error => dispatch =>
  dispatch({
    type: A0_04_FAILURE,
    payload: error,
  });

/** 単語クリア */
// tslint:disable-next-line: ter-arrow-parens
const clear: ClearAction = () => dispatch => {
  dispatch(request);

  try {
    dispatch(success);
  } catch (err) {
    dispatch(failure(err));
  }
};

export default clear;
