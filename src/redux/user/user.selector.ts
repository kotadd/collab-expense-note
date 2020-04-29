import {
  ReduxCurrentUserProps,
  ReduxSelectedUserProps,
  SelectedUserProps,
} from './user.types'

export const currentUserSelector: (
  state: ReduxCurrentUserProps
) => firebase.User = (state: ReduxCurrentUserProps) => state.user.currentUser

export const selectedUserSelector: (
  state: ReduxSelectedUserProps
) => SelectedUserProps = (state: ReduxSelectedUserProps) =>
  state.user.selectedUser
