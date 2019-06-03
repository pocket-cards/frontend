import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { B001_REQUEST, B001_SUCCESS, B001_FAILURE } from '@constants/ActionTypes';
import { WordInfo } from '@models';
import { C006_URL, GROUP_ID } from '@constants/Consts';
import { RequestAction, SuccessAction, FailureAction } from 'typings/types';

export type StartNewAction = ThunkAction<Promise<B001Actions>, any, AxiosInstance, B001Actions>;

/** 単語学習画面のActions */
export interface Actions {
  // 新規単語学習開始
  startNew: () => StartNewAction;
  // 単語知ってる/知らない
}

/** 新規単語学習開始 */
export const startNew = (): StartNewAction => async (dispatch, _, api) => {
  dispatch({ type: B001_REQUEST });

  try {
    const res = await api.get(C006_URL(GROUP_ID));

    return dispatch({
      type: B001_SUCCESS,
      payload: res.data as B001_SUCCESS_PAYLOAD,
    });
  } catch (err) {
    return dispatch({
      type: B001_FAILURE,
      payload: err,
    });
  }
};

export type B001_SUCCESS_PAYLOAD = {
  words: WordInfo[];
};

// const asyncThinkAction: ActionCreator<
//   ThunkAction<Promise<Action>, IState, void>
// > = () => {
//   return async (dispatch: Dispatch<IState>): Promise<Action> => {
//     try {
//       const text = await Api.call();
//       return dispatch({
//         type: SET_TEXT,
//         text,
//       });
//     } catch (e) {}
//   };
// };

export type B001RequestAction = RequestAction<typeof B001_REQUEST>;
export type B001SuccessAction = SuccessAction<typeof B001_SUCCESS, B001_SUCCESS_PAYLOAD>;
export type B001FailureAction = FailureAction<typeof B001_FAILURE>;
export type B001Actions = B001RequestAction | B001SuccessAction | B001FailureAction;

/** 単語学習開始 */
// export const studyStart = createAction<StudyStartPayload, number>(B000_STUDY_START, history => ({
//   words: [
//     {
//       wordId: '111',
//       word: 'test',
//       pronunciation: '1111',
//       vocabulary: '222',
//     },
//   ],
// }));

// // 単語知ってる/知らない
// export const studyResult = createAction<StudyResultPayload, boolean>(B000_STUDY_RESULT, success => ({ success }));

// /** 単語学習開始 */
// export interface StudyStartPayload {
//   words: WordInfo[];
// }

// /** 単語知ってる/知らない */
// export interface StudyResultPayload {
//   success: boolean;
// }
