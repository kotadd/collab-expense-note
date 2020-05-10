import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserListProps } from '../../src/redux/types'
import { config } from './firebase.config'

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const timestampToLocaleDate: (
  timestamp: firebase.firestore.Timestamp,
  locale: string,
  hour?: string
) => string = (timestamp, locale, hour) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }

  return hour
    ? timestamp.toDate().toLocaleDateString(locale, {
        ...defaultOptions,
        hour: 'numeric',
      })
    : timestamp.toDate().toLocaleDateString(locale, defaultOptions)
}

export async function fetchGroupIDByUID(uid: string): Promise<string> {
  const userSnapshot = await firestore.doc(`users/${uid}`).get()
  const groupID: string = await userSnapshot.get('groupID')

  return groupID
}

export const loginUser: (
  email: string,
  password: string
) => Promise<firebase.User | null> = async (email, password) => {
  if (!email || !password) return null
  const credentialedUser = await auth.signInWithEmailAndPassword(
    email,
    password
  )
  return credentialedUser.user
}

export const fetchGroupUsers: (
  userAuth: firebase.User
) => Promise<UserListProps> = async (userAuth) => {
  const groupID = await fetchGroupIDByUID(userAuth.uid)

  const userSnapshots = await firestore
    .collection('users')
    .where('groupID', '==', groupID)
    .get()

  const userList = userSnapshots.docs.map((userSnapshot) => {
    return {
      id: userSnapshot.id,
      name: userSnapshot.get('displayName'),
    }
  })

  return userList
}

export default firebase
