export type UpdateIsPaymentsUpdatedAction = {
  type: 'UPDATE_IS_PAYMENTS_UPDATED'
  payload: boolean
}

export type SetUnsubscribedPaymentsAction = {
  type: 'SET_UNSUBSCRIBED_PAYMENTS'
  payload: () => void | null
}

export const updateIsPaymentsUpdated = (): UpdateIsPaymentsUpdatedAction => ({
  type: 'UPDATE_IS_PAYMENTS_UPDATED',
  payload: true,
})

export const setUnsubscribedPayments = (
  unsubscribe: () => void
): SetUnsubscribedPaymentsAction => ({
  type: 'SET_UNSUBSCRIBED_PAYMENTS',
  payload: unsubscribe,
})
