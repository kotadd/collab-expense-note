type UserListType = {
  [key: string]: string
}

export const findGroupUsers: (
  userIDs: [string],
  users: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[]
) => UserListType = (userIDs, users) => {
  const userList = {} as UserListType

  users.forEach(user => {
    if (userIDs.indexOf(user.id) == -1) return
    return (userList[user.id] = user.data().name)
  })
  return userList
}
