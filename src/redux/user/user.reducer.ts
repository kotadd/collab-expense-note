import { UserActionTypes } from './user.types'
import { setCurrentUser } from './user.actions'
import { User } from 'firebase'

export type UserReduxProps = {
  currentUser: User | {}
}

const INITIAL_STATE = {
  currentUser: {}
}

type Actions = ReturnType<typeof setCurrentUser>

const userReducer = (
  state = INITIAL_STATE,
  action: Actions
): UserReduxProps => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}

export default userReducer
