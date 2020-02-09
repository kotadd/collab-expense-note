import { setCurrentPayments, updateIsPaymentsUpdated } from './account.actions'
import { AccountActionTypes } from './account.types'

const INITIAL_STATE = {
  currentPayments: null,
  isPaymentsUpdated: false
}

type Actions =
  | ReturnType<typeof setCurrentPayments>
  | ReturnType<typeof updateIsPaymentsUpdated>

const accountReducer = (state = INITIAL_STATE, action: Actions) => {
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
