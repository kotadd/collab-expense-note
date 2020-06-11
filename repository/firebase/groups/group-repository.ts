import firebase from 'firebase/app'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { MemberType } from '../../../src/redux/group/group.types'
import {
  setCurrentGroupID,
  SetCurrentGroupIDAction,
} from '../../../src/redux/user/user.actions'
import { fetchGroupIDByUID, firestore } from '../firebase.utils'
import { addDetailToUser } from '../users/user-repository'

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

export const fetchGroupMembers: (
  userAuth: firebase.User,
  currentGroupID: string,
  setUserList: React.Dispatch<React.SetStateAction<MemberType[] | undefined>>
) => Promise<() => void> = async (userAuth, currentGroupID, setUserList) => {
  const groupID = currentGroupID
    ? currentGroupID
    : await fetchGroupIDByUID(userAuth.uid)

  const query = firestore.collection(`groups/${groupID}/members`)

  const unsubscribedMembers = query.onSnapshot(
    (querySnapshot) => {
      const map: MemberType[] = querySnapshot.docs.map((member) => {
        return {
          id: member.get('id') as string,
          displayName: member.get('displayName') as string,
        }
      })
      setUserList(map)
    },
    () => {
      // FirebaseError: Missing or insufficient permissions になるため握り潰す
      // console.log(error)
    }
  )

  const membersSnapshots = await query.get()
  if (membersSnapshots.size === 0) setUserList(undefined)

  return unsubscribedMembers
}
