import firebase from 'firebase/app'
import { auth, firestore } from '../firebase.utils'
import { GroupType } from '../groups/group-types'
import { PublicProfileType } from './user-types'

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

export const createUserProfileDocument: (
  userAuth: firebase.User
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth: firebase.User) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await userRef.get()

  if (!userSnapshot.exists) {
    const _updatedAt = firebase.firestore.FieldValue.serverTimestamp()
    const _createdAt = _updatedAt
    try {
      await userRef.set({
        _createdAt,
        _updatedAt,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

export const createUser: (user: PublicProfileType) => Promise<void> = async (
  user: PublicProfileType
) => {
  const currentUser = auth.currentUser
  if (!currentUser) return
  return firestore.collection('public-profiles').doc(currentUser.uid).set(user)
}

export const addUserProfileDocument: (
  userAuth: firebase.User,
  groupID: string,
  name: string
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth: firebase.User, groupID: string, name: string) => {
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
        _updatedAt,
      })
      addUserToGroups(userAuth, groupID)
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}
