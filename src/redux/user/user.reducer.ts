import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // console.log(`アクションタイプは: ${action.type}`);
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // console.log(`currentUserは: ${action.payload}`);
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
