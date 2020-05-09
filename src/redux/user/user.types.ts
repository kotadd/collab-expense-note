export type ReduxCurrentUserProps = {
  user: {
    currentUser: firebase.User
  }
}

export type ReduxSelectedUserProps = {
  user: {
    selectedUserName: string
  }
  selectedUserName: string
}

export const ALL_ITEMS_STATE = {
  id: '-1',
  name: 'all-items',
}
