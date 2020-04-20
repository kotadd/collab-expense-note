export type UserType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  accountID: string
  groupID: string
  name: string
}

export type PublicProfileType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  displayName: string
  photoURL: string
}

export type UnsubscribedUserType = {}

export type UserAuthType = firebase.User

export type UserProps = {
  user: {
    currentUser: UserAuthType
  }
}
