export type SetCurrentUserAction = {
  type: 'SET_CURRENT_USER'
  payload: firebase.User | {}
}

export type SetCurrentGroupIDAction = {
  type: 'SET_CURRENT_GROUP_ID'
  payload: string
}

export type SetSelectedUserAction = {
  type: 'SET_SELECTED_USER'
  payload: string
}

export const setCurrentUser = (
  user: firebase.User | {}
): SetCurrentUserAction => ({
  type: 'SET_CURRENT_USER',
  payload: user,
})

export const setCurrentGroupID = (
  groupID: string
): SetCurrentGroupIDAction => ({
  type: 'SET_CURRENT_GROUP_ID',
  payload: groupID,
})

export const setSelectedUser = (userName: string): SetSelectedUserAction => ({
  type: 'SET_SELECTED_USER',
  payload: userName,
})
