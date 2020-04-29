import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserListProps } from '../../src/redux/types'

const config = {
  apiKey: 'AIzaSyDxYGmo8Y9WQIBJ-oemrLr8MrnYUHGZa8Y',
  authDomain: 'collab-expense-note-db.firebaseapp.com',
  databaseURL: 'https://collab-expense-note-db.firebaseio.com',
  projectId: 'collab-expense-note-db',
  storageBucket: 'collab-expense-note-db.appspot.com',
  messagingSenderId: '661228793540',
  appId: '1:661228793540:web:40a094d31c50d5d961a391',
  measurementId: 'G-1SQD65LYH7',
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

type DateOptionProps = {
  year: string
  month: string
  day: string
  weekday?: string
}

export const timestampToLocaleDate: (
  timestamp: firebase.firestore.Timestamp,
  locale: string,
  dateOptions: DateOptionProps
) => string = (timestamp, locale, dateOptions) => {
  return timestamp.toDate().toLocaleDateString(locale, dateOptions)
}

export async function fetchGroupIDByUserAuth(
  userAuth: firebase.User
): Promise<string> {
  const profileSnapshot = await firestore
    .doc(`public-profiles/${userAuth.uid}`)
    .get()

  return await profileSnapshot.get('groupID')
}

export async function fetchGroupIDByUID(uid: string): Promise<string> {
  const profileSnapshot = await firestore.doc(`public-profiles/${uid}`).get()

  return await profileSnapshot.get('groupID')
}

export const loginUser: (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential | undefined> = async (
  email,
  password
) => {
  if (!email || !password) return
  const userAuth = auth.signInWithEmailAndPassword(email, password)
  return userAuth
}

export const fetchGroupUsers: (
  userAuth: firebase.User
) => Promise<UserListProps> = async (userAuth) => {
  const groupID = await fetchGroupIDByUserAuth(userAuth)

  const profileSnapshots = await firestore
    .collection('public-profiles')
    .where('groupID', '==', groupID)
    .get()

  const userList = profileSnapshots.docs.map((profileSnapshot) => {
    return {
      id: profileSnapshot.id,
      name: profileSnapshot.get('displayName'),
    }
  })

  return userList
}

export const createPaymentsData = async (userAuth, props) => {
  if (!userAuth) return
  const profileSnapshot = await firestore
    .doc(`public-profiles/${userAuth.uid}`)
    .get()
  const groupID = await profileSnapshot.get('groupID')

  const payment = {
    ...props,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    user: `user/${userAuth.uid}`,
  }

  return await firestore.collection(`groups/${groupID}/payments`).add(payment)
}

export default firebase
