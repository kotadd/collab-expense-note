import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import groupReducer from './group/group.reducer'

export default combineReducers({
  user: userReducer,
  group: groupReducer,
})
