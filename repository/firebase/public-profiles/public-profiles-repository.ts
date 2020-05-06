import firebase from 'firebase/app'
import { Toast } from 'native-base'
import { auth, firestore } from '../firebase.utils'
import { PublicProfileType } from './public-profiles-types'

export const createPublicProfiles: (
  userAuth: firebase.User
) => Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> = async (userAuth: firebase.User) => {
  const userRef = firestore.doc(`public-profiles/${userAuth.uid}`)
  const userSnapshot = await userRef.get()

  if (userSnapshot.exists) {
    return Toast.show({
      text: 'このユーザーはすでに存在します',
      type: 'danger',
    })
  }

  try {
    await userRef.set({
      _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  } catch (error) {
    console.log('ユーザーの作成に失敗しました', error.message)
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

export const addDetailToProfile: (
  userAuth: firebase.User,
  groupID: string,
  displayName: string
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth, groupID, displayName) => {
  if (!userAuth) return

  const profileRef = firestore.doc(`public-profiles/${userAuth.uid}`)
  const profileSnapshot = await profileRef.get()
  const groupSnapshot = await firestore.doc(`groups/${groupID}`).get()

  if (profileSnapshot.exists && groupSnapshot.exists) {
    try {
      await profileRef.update({
        displayName,
        groupID,
        _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      userAuth.updateProfile({ displayName })
      await auth.updateCurrentUser(userAuth)
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return profileRef
}
