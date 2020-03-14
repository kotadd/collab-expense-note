export type GroupType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  accountID: string
  groupName: string
  userIDs: [string]
}
export type GroupProps = {
  group: GroupType
}
