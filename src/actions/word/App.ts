import { push } from 'connected-react-router';
import { List, Delete, WordListAction, WordDeleteAction, WordDetailAction, Detail } from './Actions';
import { C002Response, C005Response } from 'typings/api';
import { Consts, Paths } from '@constants';

/** グループリスト */
export const list: WordListAction = (groupId: string) => async (dispatch, _, api) => {
  // グループリスト開始イベント
  dispatch(List.request());

  try {
    const res = await api.get<C002Response>(Consts.C002_URL(groupId));

    // データ保存
    dispatch(List.success(groupId, res));
  } catch (err) {
    dispatch(List.failure(err));
  }
};

/** 単語削除 */
export const del: WordDeleteAction = (groupId: string, word: string) => async (dispatch, _, api) => {
  // 単語削除開始イベント
  dispatch(Delete.request());

  try {
    api.del<C005Response>(Consts.C005_URL(groupId, word)).then(() => {
      // データ保存
      dispatch(Delete.success(groupId, word));

      // 画面遷移
      dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]));
    });
  } catch (err) {
    dispatch(Delete.failure(err));
  }
};

/** 単語詳細 */
export const detail: WordDetailAction = (word: string) => async (dispatch, _, api) => {
  dispatch(Detail.request());

  try {
    // グループリスト画面に遷移する
    const prefix = Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyEdit].split(':')[0];

    dispatch(push(`${prefix}${word}`));

    // api.del<C005Response>(Consts.C005_URL(groupId, word)).then(() => {
    //   // データ保存
    //   dispatch(Delete.success(groupId, word));
    // });
  } catch (err) {
    dispatch(Delete.failure(err));
  }
};
