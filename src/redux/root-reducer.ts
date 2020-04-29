import { combineReducers } from 'redux'
import paymentReducer from './payment/payment.reducer'
import userReducer from './user/user.reducer'

export default combineReducers({
  user: userReducer,
  payment: paymentReducer,
})
