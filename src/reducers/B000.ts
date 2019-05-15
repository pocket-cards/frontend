import { handleActions, Action } from 'redux-actions';
import { B000 } from '@models';
import { StudyStartPayload, StudyResultPayload } from '@actions/study';
import { B000_STUDY_START, B000_STUDY_RESULT } from '@constants/ActionTypes';

const reducer = handleActions<any>(
  {
    [B000_STUDY_START]: (store: B000, action: Action<StudyStartPayload>) =>
      store.setWords(action.payload.words),

    [B000_STUDY_RESULT]: (store: B000, action: Action<StudyResultPayload>) =>
      action.payload.success ? store.success() : store.failure(),
  },
  new B000(),
);

export default reducer;
