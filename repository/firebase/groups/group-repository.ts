import firebase from 'firebase/app'
import { firestore } from '../firebase.utils'

export const fetchAllGroupData: () => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async () => {
  const groupCollectionRef = firestore.collection('groups')
  const groupCollectionSnapshot = await groupCollectionRef.get()
  return groupCollectionSnapshot.docs
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
