import { SetCurrentUserAction, SetSelectedUserAction } from './user.actions'
import { SelectedUserProps, ALL_ITEMS_STATE } from './user.types'

export type UserReduxProps = Readonly<{
  currentUser: firebase.User | {}
  selectedUser: SelectedUserProps
}>

const initialState = {
  currentUser: {},
  selectedUser: ALL_ITEMS_STATE,
}

type Action = SetCurrentUserAction | SetSelectedUserAction

const userReducer = (state = initialState, action: Action): UserReduxProps => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'SET_SELECTED_USER':
      return {
        ...state,
        selectedUser: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
