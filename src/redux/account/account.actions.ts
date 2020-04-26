import {
  MonthlyPayments,
  PaymentType,
} from '../../../repository/firebase/payments/payment-types'
import {
  SET_CURRENT_PAYMENTS,
  UPDATE_IS_PAYMENTS_UPDATED,
} from './account.types'
import { Reducer, Action } from 'redux'

type SetCurrentPaymentsAction = {
  type: 'SET_CURRENT_PAYMENTS'
  payload: MonthlyPayments | null | undefined
}

type UpdateIsPaymentsUpdatedAction = {
  type: 'UPDATE_IS_PAYMENTS_UPDATED'
  payload: boolean
}

// export const setCurrentPayments = (
//   account: MonthlyPayments | undefined
// ): SetCurrentPaymentsAction => ({
//   type: SET_CURRENT_PAYMENTS,
//   payload: account,
// })

export const setCurrentPayments = (payments: PaymentType) => ({
  type: SET_CURRENT_PAYMENTS,
  payload: payments,
})

export const updateIsPaymentsUpdated = (): UpdateIsPaymentsUpdatedAction => ({
  type: UPDATE_IS_PAYMENTS_UPDATED,
  payload: true,
})
