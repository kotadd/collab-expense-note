import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import accountReducer from './account/account.reducer'
import { PaymentType } from '../screens/types'

export interface UserState {
  currentUser: {}
}

export interface AccountState {
  currentPayments: PaymentType
  isPaymentsUpdated: boolean
}

export type AppState = {
  user: UserState
  account: AccountState
}

export default combineReducers<AppState>({
  user: userReducer,
  account: accountReducer
})
