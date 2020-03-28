import { MonthlyPayments } from '../../../repository/firebase/accounts/account-types'

type SetCurrentPaymentsAction = {
  type: 'SET_CURRENT_PAYMENTS'
  payload: MonthlyPayments | null | undefined
}

type UpdateIsPaymentsUpdatedAction = {
  type: 'UPDATE_IS_PAYMENTS_UPDATED'
  payload: boolean
}

export const setCurrentPayments = (
  account: MonthlyPayments | undefined
): SetCurrentPaymentsAction => ({
  type: 'SET_CURRENT_PAYMENTS',
  payload: account
})

export const updateIsPaymentsUpdated = (): UpdateIsPaymentsUpdatedAction => ({
  type: 'UPDATE_IS_PAYMENTS_UPDATED',
  payload: true
})
