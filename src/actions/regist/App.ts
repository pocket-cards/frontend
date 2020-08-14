import { Consts, Paths } from '@constants';
import { D001Request, D001Response, C001Request } from 'typings/api';
import isEmpty from 'lodash/isEmpty';
import { push } from 'connected-react-router/immutable';
import {
  UploadImageAction,
  UploadImage,
  RemoveWordAction,
  RemoveWord,
  RegistWordsAction,
  RegistWords,
  ClearAction,
  Clear,
} from './Actions';
import { Actions } from '@actions/word';

/** 画像アップロード */
export const uploadImage: UploadImageAction = (image: string) => async (dispatch, _, api) => {
  // 画像アップロード開始イベント
  dispatch(UploadImage.request());

  // データチェック
  if (isEmpty(image) || image.split(';').length <= 1) {
    dispatch(UploadImage.failure((null as unknown) as Error));
    return;
  }

  const imageSrc = image.replace(/^.*,/, '');

  try {
    const res = await api.post<D001Response>(Consts.D001_URL(), {
      language: 'en',
      content: imageSrc,
    } as D001Request);

    // データ保存
    dispatch(UploadImage.success(res));
    // 画面遷移
    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistList]));
  } catch (err) {
    dispatch(UploadImage.failure(err));
  }
};

/** 指定単語削除 */
export const removeWord: RemoveWordAction = (word: string) => (dispatch) => {
  // 画像アップロード開始イベント
  dispatch(RemoveWord.request());

  try {
    dispatch(RemoveWord.success(word));
  } catch (err) {
    dispatch(RemoveWord.failure(err));
  }
};

/** 単語登録 */
export const registWords: RegistWordsAction = (words: string[]) => async (dispatch, store, api) => {
  const { groupId } = store().get('app');

  try {
    // 画像アップロード開始イベント
    dispatch(RegistWords.request());

    await api.post(Consts.C001_URL(groupId), {
      words,
    } as C001Request);

    // 単語リスト再取得する
    dispatch(Actions.list(groupId));
    // データ保存
    dispatch(RegistWords.success());
  } catch (err) {
    dispatch(RegistWords.failure(err));
  } finally {
    // 画面遷移
    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.RegistFinish]));
  }
};

/** 単語クリア */
export const clear: ClearAction = () => (dispatch) => {
  dispatch(Clear.request());

  try {
    dispatch(Clear.success());
  } catch (err) {
    dispatch(Clear.failure(err));
  }
};
