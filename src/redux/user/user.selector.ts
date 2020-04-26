import { UserProps } from '../../../repository/firebase/users/user-types'

export const userSelector: (state: UserProps) => firebase.User = (state) =>
  state.user.currentUser
