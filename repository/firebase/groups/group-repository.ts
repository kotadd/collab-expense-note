import { UserType } from '../users/user-types'
import { GroupType } from './group-types'
import { firestore } from '../firebase.utils'

export const fetchAllGroupData: () => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async () => {
  const groupCollectionRef = firestore.collection('groups')
  const groupCollectionSnapshot = await groupCollectionRef.get()
  return groupCollectionSnapshot.docs
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
