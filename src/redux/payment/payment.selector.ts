import { AccountReduxProps } from './payment.reducer'

export const isPaymentsUpdatedSelector: (
  state: AccountReduxProps
) => boolean = (state) => state.isPaymentsUpdated
