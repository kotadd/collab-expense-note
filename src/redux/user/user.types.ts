export type ReduxCurrentUserProps = {
  user: {
    currentUser: firebase.User
    groupID: string
  }
}

export type ReduxSelectedUserProps = {
  user: {
    selectedUserName: string
  }
}

export const ALL_ITEMS_STATE = {
  id: '-1',
  displayName: 'all-items',
}
