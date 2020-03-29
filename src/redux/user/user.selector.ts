import {
  UserProps,
  UserAuthType
} from '../../../repository/firebase/users/user-types'

export const userSelector: (state: UserProps) => UserAuthType = state =>
  state.user.currentUser