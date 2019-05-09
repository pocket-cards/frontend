import { createAction, ActionFunction1, Action } from 'redux-actions';
import { APP_TAB_CHANGE } from '@constants/ActionTypes';

export interface TabChangePayload {
  index: number;
}

export const tabChange = createAction<TabChangePayload, number>(APP_TAB_CHANGE, index => ({ index }));

export interface Actions {
  tabChange: (index: number) => ActionFunction1<number, Action<TabChangePayload>>;
}
