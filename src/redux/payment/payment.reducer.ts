import { SET_UNSUBSCRIBED_PAYMENTS } from './payment'
import { SetUnsubscribedPaymentsAction } from './payment.actions'

export type PaymentsReduxProps = Readonly<{
  unsubscribedPayments: () => void | null
  payment: {
    unsubscribedPayments: () => void | null
  }
}>

const initialState = {
  unsubscribedPayments: null,
}

type Actions = SetUnsubscribedPaymentsAction

const accountReducer = (
  state = initialState,
  action: Actions
): PaymentsReduxProps => {
  switch (action.type) {
    case SET_UNSUBSCRIBED_PAYMENTS:
      return {
        ...state,
        unsubscribedPayments: action.payload,
      }
    default:
      return state
  }
}

export default accountReducer
