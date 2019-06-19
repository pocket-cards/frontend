import { B004RequestAction, B004SuccessAction, B004FailureAction, AnswerAction } from '.';
import { B0_04_REQUEST, B0_04_SUCCESS, B0_04_FAILURE } from '@constants/ActionTypes';
import * as startNew from '@actions/study/B001';
import * as startTest from '@actions/study/B007';
import { C006_URL, GROUP_ID, C004_URL, MODES, C007_URL } from '@constants/Consts';
import { C004Response, C004Request, C006Response, C007Response } from 'typings/api';
import { AxiosInstance } from 'axios';
import { WordInfo } from '@models';

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
  const { mode, current } = b000;

  // Request start
  dispatch(request);

  // 復習モードの場合、サーバ更新しない
  if (mode === MODES.Review) {
    dispatch(success(yes));
    return;
  }

  // データなしの場合、処理しない
  if (!current) return;

  try {
    // 正解の場合、現在の回数、不正解の場合は0に戻ります
    const times = yes ? current.times : 0;

    // 単語状態を設定する
    updateStatus(api, word, yes, times);
    // Client状態管理
    dispatch(success(yes));

    // 一定数以上の場合、再取得しない
    if (b000.words.length > 7) {
      return;
    }

    // 新規の場合
    if (mode === MODES.New) {
      const res = await api.get<C006Response>(C006_URL(GROUP_ID));

      // 新規単語の追加
      dispatch(startNew.success(res.data.words));
    } else {
      // テストの場合
      const res = await api.get<C007Response>(C007_URL(GROUP_ID));

      dispatch(startTest.success(res.data.words));
    }
  } catch (error) {
    dispatch(failure(error));
    dispatch(startNew.failure(error));
  }
};

const updateStatus = async (api: AxiosInstance, word: string, yes: boolean, times: number) =>
  await api.put<C004Response>(C004_URL(GROUP_ID, word), {
    correct: yes,
    times,
  } as C004Request);

export default answer;
