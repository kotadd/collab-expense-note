import { AccountActionTypes } from './account.types';

export const setCurrentPayments = account => ({
  type: AccountActionTypes.SET_CURRENT_PAYMENTS,
  payload: account
});

export const updateIsPaymentsUpdated = () => ({
  type: AccountActionTypes.UPDATE_IS_PAYMENTS_UPDATED,
  payload: true
});
