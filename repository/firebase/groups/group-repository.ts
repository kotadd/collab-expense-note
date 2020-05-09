import firebase from 'firebase/app'
import { firestore } from '../firebase.utils'

export const fetchAllGroupData: () => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async () => {
  const groupCollectionRef = firestore.collection('groups')
  const groupCollectionSnapshot = await groupCollectionRef.get()
  return groupCollectionSnapshot.docs
}

export const isNewGroupName: (name: string) => Promise<boolean> = async (
  name
) => {
  const groupCollectionSnapshot = await firestore.collection('groups').get()
  const result = groupCollectionSnapshot.docs.map((group) => {
    if (name === group.data().name) return true
  })

  if (!result) return false
  return true
}

export const createGroup: (
  name: string
) => Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> = async (name) => {
  const group = {
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    name,
  }
  const result = await firestore.collection(`groups/`).add(group)
  return result
}
