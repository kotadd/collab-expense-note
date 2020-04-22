import { AccountReduxProps } from './account.reducer'

export const isPaymentsUpdatedSelector: (
  state: AccountReduxProps
) => boolean = (state) => state.isPaymentsUpdated
