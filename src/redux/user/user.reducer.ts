import { SetCurrentUserAction, SetSelectedUserAction } from './user.actions'

export type UserReduxProps = Readonly<{
  currentUser: firebase.User | {}
  selectedUserName: string
}>

const initialState = {
  currentUser: {},
  selectedUserName: 'all-items',
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
        selectedUserName: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
