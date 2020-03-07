export type UserAuthType = firebase.User | null
export type UserType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  accountID: string
  email: string
  groupID: string
  name: string
}
export interface UserProps {
  user: {
    currentUser: UserType
  }
}
