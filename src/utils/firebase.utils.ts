import { UserListProps } from '../redux/types'

export const findGroupUsers: (
  userIDs: [string],
  users: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[]
) => UserListProps = (userIDs, users) => {
  const userList = {} as UserListProps

  users.forEach(user => {
    if (userIDs.indexOf(user.id) == -1) return
    return (userList[user.id] = user.data().name)
  })
  return userList
}
