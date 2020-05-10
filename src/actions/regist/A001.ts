import { History } from 'history';
import { createAction, ActionFunction0, ActionFunction1, Action, ActionFunction2 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, Consts, Paths } from '@constants';
import { D001Request, D001Response } from 'typings/api';
import { ErrorPayload, APIClass } from 'typings/types';
import { State } from '@models';
import isEmpty from 'lodash/isEmpty';

/** 画像アップロード */
export const request: A001RequestAction = createAction(ActionTypes.A0_01_REQUEST);
export const success: A001SuccessAction = createAction(ActionTypes.A0_01_SUCCESS, (data: D001Response) => ({ data }));
export const failure: A001FailureAction = createAction(ActionTypes.A0_01_FAILURE, (error: Error) => ({ error }));

/** 画像アップロード */
// tslint:disable-next-line: ter-arrow-parens
const uploadImage: UploadImageAction = (image: string, history?: History<any>) => async (dispatch, _, api) => {
  // 画像アップロード開始イベント
  dispatch(request);

  // データチェック
  if (isEmpty(image) || image.split(';').length <= 1) {
    dispatch(failure((null as unknown) as Error));
    return;
  }

  const type = image.split(';')[0].split(':')[1];
  const imageSrc = image.replace(/^.*,/, '');

  // 画面遷移
  history && history.push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistList]);

  try {
    const res = await api.post<D001Response>(Consts.D001_URL(), {
      type,
      image: imageSrc,
    } as D001Request);

    // データ保存
    dispatch(success(res));
  } catch (err) {
    dispatch(failure(err));
  }
};

/** 画像アップロード */
export interface A001Payload {
  data: D001Response;
}
export type A001RequestAction = ActionFunction0<Action<any>>;
export type A001SuccessAction = ActionFunction1<D001Response, Action<A001Payload>>;
export type A001FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type UploadImagePayload = A001Payload | ErrorPayload;
export type UploadImageThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<UploadImagePayload>>;
export type UploadImageAction = ActionFunction2<string, History<any>, UploadImageThunkAction>;

export default uploadImage;
