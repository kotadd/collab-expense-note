import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { UserAuthType } from './user-types'
import { addUserToGroups } from '../firebase.utils'
import { GroupType } from '../groups/group-types'

const firestore = firebase.firestore()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const fetchAllUserData = async () => {
  const userCollectionRef = firestore.collection('users')
  const userCollectionSnapshot = await userCollectionRef.get()
  return userCollectionSnapshot.docs
}

export const createUserProfileDocument: (
  userAuth: UserAuthType
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth: UserAuthType) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await userRef.get()

  if (!userSnapshot.exists) {
    const { email } = userAuth
    const _updatedAt = new Date()
    const _createdAt = _updatedAt
    try {
      await userRef.set({
        email,
        _createdAt,
        _updatedAt
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const addUserProfileDocument: (
  userAuth: UserAuthType,
  groupID: string,
  name: string
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth: UserAuthType, groupID: string, name: string) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await userRef.get()

  const groupRef = firestore.doc(`groups/${groupID}`)
  const groupSnapshot = await groupRef.get()
  const groupInfo = groupSnapshot.data() as GroupType

  const { accountID } = groupInfo
  if (!accountID) return

  if (userSnapshot.exists) {
    const _updatedAt = new Date()
    try {
      await userRef.update({
        name,
        accountID,
        groupID,
        _updatedAt
      })
      addUserToGroups(userAuth, groupID)
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}
