import { Record } from 'immutable';
import { E002Payload, E001Payload } from '@actions/group';
import { GroupInfo } from 'typings/types';

export interface E000Props {
  groups: GroupInfo[];
  isLoading: boolean;
}

export interface IE000 extends E000Props, Record<E000Props> {
  get<K extends keyof E000Props>(key: K): E000Props[K];
}

/**
 * グループ管理
 */
export default class E000 extends Record<E000Props>({
  groups: [],
  isLoading: false,
}) {
  /**
   * グループ一覧追加
   */
  addList(payload: E001Payload) {
    return this.set('groups', payload.groups);
  }

  /**
   * グループ新規登録
   */
  add(payload: E002Payload) {
    this.groups.push(payload);

    return this.set('groups', this.groups);
  }

  /** 取込中 */
  startLoading() {
    return this.set('isLoading', true);
  }

  endLoading() {
    return this.set('isLoading', false);
  }
}
