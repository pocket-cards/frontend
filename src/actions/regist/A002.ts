import { createAction, ActionFunction0, ActionFunction1, Action } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from '@constants';
import { ErrorPayload, APIClass } from 'typings/types';
import { State } from '@models';

/** 指定単語削除 */
export const request: A002RequestAction = createAction(ActionTypes.A0_02_REQUEST);
export const success: A002SuccessAction = createAction(ActionTypes.A0_02_SUCCESS, (word: string) => ({ word }));
export const failure: A002FailureAction = createAction(ActionTypes.A0_02_FAILURE, (error: Error) => ({ error }));

/** 指定単語削除 */
// tslint:disable-next-line: ter-arrow-parens
const removeWord: RemoveWordAction = (word: string) => (dispatch) => {
  // 画像アップロード開始イベント
  dispatch(request);

  try {
    dispatch(success(word));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** 指定単語削除 */
export interface A002Payload {
  word: string;
}
export type A002RequestAction = ActionFunction0<Action<any>>;
export type A002SuccessAction = ActionFunction1<string, Action<A002Payload>>;
export type A002FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type RemoveWordPayload = A002Payload | ErrorPayload;
export type RemoveWordThunkAction = ThunkAction<void, State, APIClass, Action<RemoveWordPayload>>;
export type RemoveWordAction = ActionFunction1<string, RemoveWordThunkAction>;

export default removeWord;
