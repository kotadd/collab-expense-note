import { AccountActionTypes } from './account.types';

const INITIAL_STATE = {
  currentPayments: null
};

const accountReducer = (state = INITIAL_STATE, action) => {
  
  switch (action.type) {
    case AccountActionTypes.SET_CURRENT_PAYMENTS:
      return {
        ...state,
        currentPayments: action.payload
      };
    default:
      return state;
  }
};

export default accountReducer;
