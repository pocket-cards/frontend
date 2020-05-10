import { createAction, ActionFunction0, ActionFunction1, Action, ActionFunction2 } from 'redux-actions';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, Consts } from '@constants';
import { C004Request, C006Response, C007Response } from 'typings/api';
import { APIClass, Payload, ErrorPayload } from 'typings/types';
import { State } from '@models';
import * as StartNew from '@actions/study/B001';
import * as StartTest from '@actions/study/B007';

/** テスト回答(YES/NO) */
export const request: B004RequestAction = createAction(ActionTypes.B0_04_REQUEST);
export const success: B004SuccessAction = createAction(ActionTypes.B0_04_SUCCESS, (yes: boolean) => ({ yes }));
export const failure: B004FailureAction = createAction(ActionTypes.B0_04_FAILURE, (error: Error) => ({ error }));

/** テスト回答(YES/NO) */
const answer: AnswerAction = (word: string, yes: boolean) => async (dispatch, getState, api) => {
  const b000 = getState().get('b000');
  const { mode, current } = b000;

  // Request start
  dispatch(request);

  // 復習モードの場合、サーバ更新しない
  if (mode === Consts.MODES.Review) {
    dispatch(success(yes));
    return;
  }

  // 新規学習モードの場合、不正解の場合、更新しない
  if (mode === Consts.MODES.New && !yes) {
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
    if (b000.words.length > 5) {
      return;
    }

    // 0.1秒待ち
    await sleep(100);

    // 新規の場合
    if (mode === Consts.MODES.New) {
      const res = await api.get<C006Response>(Consts.C006_URL(Consts.GROUP_ID));

      // 新規単語の追加
      dispatch(StartNew.success(res.words));
    } else {
      // テストの場合
      const res = await api.get<C007Response>(Consts.C007_URL(Consts.GROUP_ID));

      dispatch(StartTest.success(res.words));
    }
  } catch (error) {
    dispatch(failure(error));
    dispatch(StartNew.failure(error));
  }
};

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

const updateStatus = async (api: APIClass, word: string, yes: boolean, times: number) => {
  await api.put(Consts.C004_URL(Consts.GROUP_ID, word), {
    correct: yes,
    times,
  } as C004Request);
};

export interface B004Payload {
  yes: boolean;
}
export type B004RequestAction = ActionFunction0<Action<Payload>>;
export type B004SuccessAction = ActionFunction1<boolean, Action<B004Payload>>;
export type B004FailureAction = ActionFunction1<Error, Action<ErrorPayload>>;

export type AnswerPayload = Payload | B004Payload | ErrorPayload;
export type AnswerThunkAction = ThunkAction<Promise<void>, State, APIClass, Action<AnswerPayload>>;
export type AnswerAction = ActionFunction2<string, boolean, AnswerThunkAction>;

export default answer;
