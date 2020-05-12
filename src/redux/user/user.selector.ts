import { ReduxCurrentUserProps, ReduxSelectedUserProps } from './user.types'

export const currentUserSelector: (
  state: ReduxCurrentUserProps
) => firebase.User = (state) => state.user.currentUser

export const currentGroupIDSelector: (
  state: ReduxCurrentUserProps
) => string = (state) => state.user.groupID

export const selectedUserSelector: (state: ReduxSelectedUserProps) => string = (
  state
) => state.user.selectedUserName
