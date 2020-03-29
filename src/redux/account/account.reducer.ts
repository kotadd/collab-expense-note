import { MonthlyPayments } from '../../../repository/firebase/accounts/account-types'
import { setCurrentPayments, updateIsPaymentsUpdated } from './account.actions'
import {
  SET_CURRENT_PAYMENTS,
  UPDATE_IS_PAYMENTS_UPDATED
} from './account.types'

export type AccountReduxProps = {
  currentPayments: MonthlyPayments | null | undefined
  isPaymentsUpdated: boolean
}

const INITIAL_STATE = {
  currentPayments: null,
  isPaymentsUpdated: false
}

type Actions =
  | ReturnType<typeof setCurrentPayments>
  | ReturnType<typeof updateIsPaymentsUpdated>

const accountReducer = (
  state = INITIAL_STATE,
  action: Actions
): AccountReduxProps => {
  switch (action.type) {
    case SET_CURRENT_PAYMENTS:
      return {
        ...state,
        currentPayments: action.payload
      }
    case UPDATE_IS_PAYMENTS_UPDATED:
      return {
        ...state,
        isPaymentsUpdated: !state.isPaymentsUpdated
      }
    default:
      return state
  }
}

export default accountReducer
