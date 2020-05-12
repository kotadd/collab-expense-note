import firebase from 'firebase/app'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { firestore } from '../firebase.utils'
import { addDetailToUser } from '../users/user-repository'
import { Dispatch } from 'redux'
import {
  setCurrentGroupID,
  SetCurrentGroupIDAction,
} from '../../../src/redux/user/user.actions'

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
  navigation: RootScreenNavigationProp,
  dispatch: Dispatch<SetCurrentGroupIDAction>
) => Promise<void> = async (
  userAuth,
  displayName,
  groupName,
  navigation,
  dispatch
) => {
  const group = {
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    _createdBy: displayName,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    groupName,
  }
  const newGroup = await firestore.collection(`groups`).add(group)
  const result = addDetailToUser(userAuth, newGroup.id, displayName)
  if (!result) return
  dispatch(setCurrentGroupID(newGroup.id))

  navigation.navigate('HomeTabs', {
    screen: 'Home',
    params: {
      screen: 'Main',
      params: {
        screen: 'Monthly',
      },
    },
  })
}
