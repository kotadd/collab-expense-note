import { UPDATE_IS_PAYMENTS_UPDATED } from './payment'

type UpdateIsPaymentsUpdatedAction = {
  type: 'UPDATE_IS_PAYMENTS_UPDATED'
  payload: boolean
}

export const updateIsPaymentsUpdated = (): UpdateIsPaymentsUpdatedAction => ({
  type: UPDATE_IS_PAYMENTS_UPDATED,
  payload: true,
})
