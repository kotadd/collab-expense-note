import { combineReducers } from 'redux'
import paymentReducer from './payment/payment.reducer'
import userReducer from './user/user.reducer'
import groupReducer from './group/group.reducer'

export default combineReducers({
  user: userReducer,
  payment: paymentReducer,
  group: groupReducer,
})
