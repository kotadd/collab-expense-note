import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // console.log('entered');
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // console.log(`currentUser: ${action.payload}`);
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
