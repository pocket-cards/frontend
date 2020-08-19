import { Record } from 'immutable';
import { E002Payload, E001Payload, E004Payload } from '@actions/group';
import { GroupInfo, GroupWordsItem } from 'typings/types';
import { E005Payload } from '@actions/word';
import { E008Payload, E006Payload } from '@actions/word/Actions';
import { E001Response } from 'typings/api';

export interface E000Props {
  groups: GroupInfo[];
  words: GroupWordsItem[];
  isLoading: boolean;
  wordDetail?: E001Response;
}

export interface IE000 extends E000Props, Record<E000Props> {
  get<K extends keyof E000Props>(key: K): E000Props[K];
}

/**
 * グループ管理
 */
export default class E000 extends Record<E000Props>({
  groups: [],
  words: [],
  isLoading: false,
  wordDetail: undefined,
}) {
  /**
   * グループ一覧追加
   */
  addGroupList(payload: E001Payload) {
    return this.set('groups', payload.groups);
  }

  /** グループ新規登録 */
  addGroup(payload: E002Payload) {
    this.groups.push(payload);

    return this.set('groups', this.groups);
  }

  /** グループ削除 */
  delGroup(payload: E004Payload) {
    const groups = this.groups.filter((item) => item.id !== payload.groupId);
    const words = this.words.filter((item) => item.groupId !== payload.groupId);

    return this.set('groups', groups).set('words', words);
  }

  /** 単語一覧追加 */
  addWordList(payload: E005Payload) {
    const item = this.words.find((item) => item.groupId === payload.groupId);

    // 存在する
    if (item) {
      item.words = payload.words;
    } else {
      // 存在しない
      this.words.push({
        groupId: payload.groupId,
        words: payload.words,
      });
    }

    return this.set('words', this.words);
  }

  /** 単語詳細情報取得 */
  setWordDetail(payload: E006Payload) {
    return this.set('wordDetail', payload.res);
  }

  /** 単語詳細情報クリア */
  clearWordDetail() {
    return this.set('wordDetail', undefined);
  }

  /** 単語削除 */
  delWord(payload: E008Payload) {
    const group = this.words.find((item) => item.groupId === payload.groupId);

    if (group) {
      const words = group?.words.filter((item) => item.word !== payload.word);
      group.words = words;
    }

    return this.set('words', this.words);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
