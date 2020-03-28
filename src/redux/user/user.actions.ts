import { UserActionTypes } from './user.types'
import { User } from 'firebase'

type Action = {
  type: string
  payload: User | {}
}

export const setCurrentUser = (user: User | {}): Action => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
})
