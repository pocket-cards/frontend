import { handleActions, Action } from 'redux-actions';
import { A000 } from '@models';
import { RemoveWordPayload, UploadImagePayload } from '@actions/regist';
import {
  A000_REMOVE_WORD,
  A000_REGIST_WORDS,
  A000_UPLOAD_IMAGE,
} from '@constants/ActionTypes';

const reducer = handleActions<any>(
  {
    [A000_UPLOAD_IMAGE]: (store: A000, action: Action<UploadImagePayload>) =>
      store.setWords(action.payload.words),

    [A000_REMOVE_WORD]: (store: A000, action: Action<RemoveWordPayload>) =>
      store.removeWord(action.payload.word),

    [A000_REGIST_WORDS]: (store: A000) => store.clearWords(),
  },
  new A000(),
);

export default reducer;
