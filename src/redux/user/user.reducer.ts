import {
  SetCurrentUserAction,
  SetSelectedUserAction,
  SetCurrentGroupIDAction,
} from './user.actions'

export type UserReduxProps = Readonly<{
  currentUser: firebase.User | {}
  currentGroupID: string
  selectedUserName: string
}>

const initialState = {
  currentUser: {},
  currentGroupID: '',
  selectedUserName: 'all-items',
}

type Action =
  | SetCurrentUserAction
  | SetCurrentGroupIDAction
  | SetSelectedUserAction

const userReducer = (state = initialState, action: Action): UserReduxProps => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    case 'SET_CURRENT_GROUP_ID':
      return {
        ...state,
        currentGroupID: action.payload,
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
