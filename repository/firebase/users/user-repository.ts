import firebase from 'firebase/app'
import { Toast } from 'native-base'
import { auth, firestore, fetchGroupIDByUID } from '../firebase.utils'
import { UserListProps } from '../../../src/redux/types'

export const createUser: (
  userAuth: firebase.User
) => Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> = async (userAuth: firebase.User) => {
  const userRef = firestore.doc(`users/${userAuth.uid}`)
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

export const addDetailToUser: (
  userAuth: firebase.User,
  groupID: string,
  displayName: string
) => Promise<void | firebase.firestore.DocumentReference<
  firebase.firestore.DocumentData
>> = async (userAuth, groupID, displayName) => {
  if (!userAuth) return

  const profileRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await profileRef.get()

  const groupSnapshot = await firestore.doc(`groups/${groupID}`).get()

  if (userSnapshot.exists && groupSnapshot.exists) {
    try {
      await profileRef.update({
        displayName,
        groupID,
        _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      userAuth.updateProfile({ displayName })
      await auth.updateCurrentUser(userAuth)
    } catch (error) {
      Toast.show({
        text: 'ユーザーの情報を追加するのに失敗しました。',
        type: 'danger',
      })
    }
  }

  return profileRef
}

export const fetchGroupUsers: (
  userAuth: firebase.User,
  currentGroupID: string
) => Promise<UserListProps> = async (userAuth, currentGroupID) => {
  const groupID = currentGroupID
    ? currentGroupID
    : await fetchGroupIDByUID(userAuth.uid)

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
