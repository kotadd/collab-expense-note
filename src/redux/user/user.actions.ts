import { User } from 'firebase'
import { SET_SELECTED_USER, SET_CURRENT_USER } from './user.types'

export type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER'
  payload: User | {}
}

export type SetSelectedUserAction = {
  type: 'SET_SELECTED_USER'
  payload: string
}

export const setCurrentUser = (user: User | {}): SetCurrentUserAction => ({
  type: SET_CURRENT_USER,
  payload: user
})

export const setSelectedUser = (userName: string): SetSelectedUserAction => ({
  type: SET_SELECTED_USER,
  payload: userName
})
