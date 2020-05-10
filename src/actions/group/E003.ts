// import { History } from 'history';
// import { E0_02_REQUEST, E0_02_SUCCESS, E0_02_FAILURE } from '@constants';
// import { D001_URL, B002_URL, B003_URL } from '@constants';
// import { Paths } from '@constants';
// import { D001Request, D001Response, B002Response, B003Response, B003Request } from 'typings/api';
// import * as loadsh from 'lodash';
// import { E002RequestAction, E002SuccessAction, E002FailureAction, GroupListAction, GroupRegistAction } from '.';
// import { UploadImageAction } from '@actions/regist';

// /** 画像アップロード */
// export const request: C001RequestAction = createAction(C0_01_REQUEST);
// export const success: C001SuccessAction = createAction(C0_01_SUCCESS, (data: A002Response) => ({ data }));
// export const failure: C001FailureAction = createAction(C0_01_FAILURE, (error: Error) => ({ error }));

// export const request: E002RequestAction = dispatch =>
//   dispatch({
//     type: E0_02_REQUEST,
//   });

// /** 画像アップロード */
// export const success: E002SuccessAction = data => dispatch =>
//   dispatch({
//     type: E0_02_SUCCESS,
//     payload: data,
//   });

// /** 画像アップロード */
// export const failure: E002FailureAction = error => dispatch =>
//   dispatch({
//     type: E0_02_FAILURE,
//     payload: error,
//   });

// /** グループ一覧 */
// const groupList: GroupRegistAction = (name: string, description: string) => async (dispatch, store, api) => {
//   // 画像アップロード開始イベント
//   dispatch(request);
//   const user = store()
//     .get('App')
//     .get('user');

//   if (!user) return;

//   try {
//     const res = await api.post<B003Response>(B003_URL(user.getUsername()), {
//       name,
//       description,
//     } as B003Request);
//     // データ保存
//     dispatch(success(res));
//   } catch (err) {
//     dispatch(failure(err));
//   }
// };

// export default groupList;
