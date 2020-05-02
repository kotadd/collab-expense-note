import { ReduxCurrentUserProps, ReduxSelectedUserProps } from './user.types'

export const currentUserSelector: (
  state: ReduxCurrentUserProps
) => firebase.User = (state: ReduxCurrentUserProps) => state.user.currentUser

export const selectedUserSelector: (state: ReduxSelectedUserProps) => string = (
  state: ReduxSelectedUserProps
) => state.user.selectedUserName
