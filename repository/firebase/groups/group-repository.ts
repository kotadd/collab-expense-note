import firebase from 'firebase/app'
import { firestore } from '../firebase.utils'
import { addDetailToUser } from '../users/user-repository'
import { RootScreenNavigationProp } from '../../../AppContainer'

export const isCorrectGroup: (groupID: string) => Promise<boolean> = async (
  groupID: string
) => {
  const groupSnapshot = await firestore.collection('groups').doc(groupID).get()

  return groupSnapshot.exists ? true : false
}

export const createNewGroup: (
  userAuth: firebase.User,
  displayName: string,
  groupName: string,
  navigation: RootScreenNavigationProp
) => Promise<void> = async (userAuth, displayName, groupName, navigation) => {
  const group = {
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    groupName,
  }
  const newGroup = await firestore.collection(`groups`).add(group)
  const result = addDetailToUser(userAuth, newGroup.id, displayName)
  if (!result) return
  navigation.navigate('Main', { screen: 'Monthly' })
}
