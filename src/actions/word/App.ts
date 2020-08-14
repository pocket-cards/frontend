import { List, WordListAction } from './Actions';
import { C002Response } from 'typings/api';
import { Consts } from '@constants';

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
