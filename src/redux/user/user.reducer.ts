import { User } from 'firebase'
import { SET_SELECTED_USER, SET_CURRENT_USER } from './user.types'
import { SetCurrentUserAction, SetSelectedUserAction } from './user.actions'

export type UserReduxProps = Readonly<{
  currentUser: User | {}
  selectedUser?: string
  isUserUpdated: boolean
}>

const initialState = {
  currentUser: {},
  selectedUser: 'all-items',
  isUserUpdated: false,
}

type Action = SetCurrentUserAction | SetSelectedUserAction

const userReducer = (state = initialState, action: Action): UserReduxProps => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
