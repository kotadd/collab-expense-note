import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserListProps } from '../../src/redux/types'
import { GroupType } from './groups/group-types'
import { UserType } from './users/user-types'

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

export const fetchAllGroupData: () => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async () => {
  const groupCollectionRef = firestore.collection('groups')
  const groupCollectionSnapshot = await groupCollectionRef.get()
  return groupCollectionSnapshot.docs
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

export const fetchGroupByUser: (
  userInfo: UserType | undefined
) => Promise<GroupType | undefined> = async (userInfo) => {
  if (!userInfo) return
  const { groupID } = userInfo
  if (!groupID) return

  const groupRef = firestore.doc(`groups/${groupID}`)
  const groupSnapshot = await groupRef.get()
  const groupInfo = groupSnapshot.data()

  return groupInfo as GroupType
}

export const fetchUserByUserAuth: (
  userAuth: firebase.User
) => Promise<UserType | undefined> = async (userAuth: firebase.User) => {
  if (!userAuth) return

  const userRef = firestore.doc(`public-profiles/${userAuth.uid}`)
  const userSnapshot = await userRef.get()
  const userInfo = userSnapshot.data()

  return userInfo as UserType
}

export const addUserToGroups: (
  userAuth: firebase.User,
  groupID: string
) => Promise<void> = async (userAuth, groupID) => {
  if (!userAuth || !groupID) return

  const userID = userAuth.uid
  const userRef = firestore.doc(`users/${userID}`)
  const userSnapshot = await userRef.get()

  const _updatedAt = firebase.firestore.FieldValue.serverTimestamp()
  if (userSnapshot.exists) {
    try {
      await userRef.update({ _updatedAt })
    } catch (error) {
      console.log('error groupdID to the user', error.message)
    }
  }

  const groupRef = firestore.doc(`groups/${groupID}`)
  const groupSnapshot = await groupRef.get()
  const groupInfo = groupSnapshot.data() as GroupType

  if (groupSnapshot.exists) {
    try {
      let { userIDs } = groupInfo

      if (userIDs.indexOf(userID) != -1)
        return console.log('このユーザーはすでにグループに含まれています')
      userIDs ? userIDs.push(userID) : (userIDs = [userID])

      await groupRef.update({ _updatedAt, userIDs })
    } catch (error) {
      console.log('error add user to group', error.message)
    }
  }
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

export const createAccountAndGroup: (
  name: string
) => Promise<null | undefined> = async (name) => {
  const accountsRef = firestore.collection('accounts').doc()
  const groupsRef = firestore.collection('groups').doc()
  try {
    const _updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    const _createdAt = _updatedAt
    accountsRef.set({
      _createdAt,
      _updatedAt,
    })
    groupsRef.set({
      _createdAt,
      _updatedAt,
      name,
      accountID: accountsRef.id,
      userIDs: [],
    })
    return
  } catch (error) {
    console.log('error creating user', error.message)
  }

  return null
}

export default firebase
