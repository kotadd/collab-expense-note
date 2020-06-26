import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { config, prodConfig } from './firebase.config'

if (process.env.NODE_ENV === 'development') {
  firebase.initializeApp(config)
} else {
  firebase.initializeApp(prodConfig)
}

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
  return userSnapshot.get('groupID') as string
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

export default firebase
