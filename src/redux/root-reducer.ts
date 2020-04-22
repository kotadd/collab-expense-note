import { combineReducers } from 'redux'
import accountReducer from './account/account.reducer'
import userReducer from './user/user.reducer'

export default combineReducers({
  user: userReducer,
  account: accountReducer,
})
