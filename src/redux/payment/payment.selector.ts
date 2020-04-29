import { PaymentsReduxProps } from './payment.reducer'

export const unsubscribedPaymentsSelector: (
  state: PaymentsReduxProps
) => () => void = (state) => state.payment.unsubscribedPayments
