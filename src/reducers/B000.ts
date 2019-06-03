import { B000 } from '@models';
import { B001_FAILURE, B001_SUCCESS, B001_REQUEST } from '@constants/ActionTypes';
import { B001Actions, B001SuccessAction } from '@actions/study';

const reducer = (store: B000 = new B000(), action: B001Actions) => {
  switch (action.type) {
    case B001_REQUEST:
      return store;
    case B001_SUCCESS:
      return b001Success(store, action);
    case B001_FAILURE:
      return store;
    default:
      return store;
  }
};

const b001Success = (store: B000, action: B001SuccessAction) => store.setWords(action.payload.words);

export default reducer;
