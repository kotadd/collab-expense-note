import { User } from 'firebase'

export type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER'
  payload: User | {}
}

export type SetSelectedUserAction = {
  type: 'SET_SELECTED_USER'
  payload: string
}

export const setCurrentUser = (user: User | {}): SetCurrentUserAction => ({
  type: 'SET_CURRENT_USER',
  payload: user,
})

export const setSelectedUser = (userName: string) => ({
  type: 'SET_SELECTED_USER',
  payload: userName,
})
