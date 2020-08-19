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

/** 単語削除 */
export const delRow: WordDeleteAction = (groupId: string, word: string) => async (dispatch, _, api) => {
  // 単語削除開始イベント
  dispatch(Delete.request());

  try {
    // データ保存
    dispatch(Delete.success(groupId, word));

    await api.del<C005Response>(Consts.C005_URL(groupId, word));
  } catch (err) {
    dispatch(Delete.failure(err));
  }
};

/** 単語詳細 */
export const detail: WordDetailAction = (word: string) => async (dispatch, _, api) => {
  dispatch(Detail.request());

  try {
    // 単語詳細画面へ遷移する
    const prefix = Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyEdit].split(':')[0];

    dispatch(push(`${prefix}${word}`));

    // 単語詳細情報を取得する
    api.get(Consts.E001_URL(word)).then((res) => dispatch(Detail.success(res)));
  } catch (err) {
    dispatch(Detail.failure(err));
  }
};
