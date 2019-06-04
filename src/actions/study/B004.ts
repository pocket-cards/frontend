import { B004RequestAction, B004SuccessAction, B004FailureAction, AnswerAction } from '.';
import { B0_04_REQUEST, B0_04_SUCCESS, B0_04_FAILURE } from '@constants/ActionTypes';
import * as startNew from '@actions/study/B001';
import { C006_URL, GROUP_ID, C004_URL } from '@constants/Consts';
import { C004Response, C004Request } from 'typings/api';

/** テスト回答(YES/NO) */
export const request: B004RequestAction = dispatch =>
  dispatch({
    type: B0_04_REQUEST,
  });

/** テスト回答(YES/NO) */
export const success: B004SuccessAction = (yes: boolean) => dispatch =>
  dispatch({
    type: B0_04_SUCCESS,
    payload: {
      yes,
    },
  });

/** テスト回答(YES/NO) */
export const failure: B004FailureAction = error => dispatch =>
  dispatch({
    type: B0_04_FAILURE,
    payload: error,
  });

/** テスト回答(YES/NO) */
const answer: AnswerAction = (word: string, yes: boolean) => async (dispatch, getState, api) => {
  const b000 = getState().get('B000');

  // Request start
  dispatch(request);

  // 正解の場合、単語の状態を更新する
  if (yes && b000.current) {
    const times = b000.current.times;

    await api.put<C004Response>(C004_URL(GROUP_ID, word), {
      correct: yes,
      times,
    } as C004Request);
  }

  // 後続の判断
  if (b000.getMore()) {
    console.log(3333);

    // 単語の取得
    const res = await api.get(C006_URL(GROUP_ID));

    // 新規単語の追加
    dispatch(startNew.success(res.data));
  }

  try {
    dispatch(success(yes));
  } catch (error) {
    dispatch(failure(error));
  }
};

export default answer;
