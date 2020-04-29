import { User } from 'firebase'
import { SelectedUserProps } from './user.types'

export type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER'
  payload: User | {}
}

export type SetSelectedUserAction = {
  type: 'SET_SELECTED_USER'
  payload: SelectedUserProps
}

export const setCurrentUser = (user: User | {}): SetCurrentUserAction => ({
  type: 'SET_CURRENT_USER',
  payload: user,
})

export const setSelectedUser = (
  user: SelectedUserProps
): SetSelectedUserAction => ({
  type: 'SET_SELECTED_USER',
  payload: user,
})
