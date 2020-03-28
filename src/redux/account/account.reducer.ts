import { MonthlyPayments } from '../../../repository/firebase/accounts/account-types'
import { setCurrentPayments } from './account.actions'
import { AccountActionTypes } from './account.types'

export type AccountReduxProps = {
  currentPayments: MonthlyPayments | null | undefined
  isPaymentsUpdated: boolean
}

const INITIAL_STATE = {
  currentPayments: null,
  isPaymentsUpdated: false
}

type Actions = ReturnType<typeof setCurrentPayments>

const accountReducer = (
  state = INITIAL_STATE,
  action: Actions
): AccountReduxProps => {
  switch (action.type) {
    case AccountActionTypes.SET_CURRENT_PAYMENTS:
      return {
        ...state,
        currentPayments: action.payload
      }
    case AccountActionTypes.UPDATE_IS_PAYMENTS_UPDATED:
      return {
        ...state,
        isPaymentsUpdated: !state.isPaymentsUpdated
      }
    default:
      return state
  }
}

export default accountReducer
