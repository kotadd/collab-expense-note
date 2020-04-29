import { UPDATE_IS_PAYMENTS_UPDATED } from './payment'
import { updateIsPaymentsUpdated } from './payment.actions'

export type AccountReduxProps = {
  isPaymentsUpdated: boolean
}

const INITIAL_STATE = {
  isPaymentsUpdated: false,
}

type Actions = ReturnType<typeof updateIsPaymentsUpdated>

const accountReducer = (
  state = INITIAL_STATE,
  action: Actions
): AccountReduxProps => {
  switch (action.type) {
    case UPDATE_IS_PAYMENTS_UPDATED:
      return {
        ...state,
        isPaymentsUpdated: !state.isPaymentsUpdated,
      }
    default:
      return state
  }
}

export default accountReducer
