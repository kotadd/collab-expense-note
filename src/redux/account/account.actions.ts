import { AccountActionTypes } from './account.types';

export const setCurrentPayments = account => ({
  type: AccountActionTypes.SET_CURRENT_PAYMENTS,
  payload: account
});
