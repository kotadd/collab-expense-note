export type SelectedUserProps = {
  id: string
  name: string
}

export type ReduxCurrentUserProps = {
  user: {
    currentUser: firebase.User
  }
}

export type ReduxSelectedUserProps = {
  user: {
    selectedUser: SelectedUserProps
  }
  selectedUser: SelectedUserProps
}

export const ALL_ITEMS_STATE = {
  id: '-1',
  name: 'all-items',
}
