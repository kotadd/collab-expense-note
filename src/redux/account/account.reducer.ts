import { AccountActionTypes } from './account.types';
import { updateIsPaymentsUpdated } from './account.actions';

const INITIAL_STATE = {
  currentPayments: null,
  isPaymentsUpdated: false
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AccountActionTypes.SET_CURRENT_PAYMENTS:
      return {
        ...state,
        currentPayments: action.payload
      };
    case AccountActionTypes.UPDATE_IS_PAYMENTS_UPDATED:
      return {
        ...state,
        isPaymentsUpdated: !state.isPaymentsUpdated
      };
    default:
      return state;
  }
};

export default accountReducer;
