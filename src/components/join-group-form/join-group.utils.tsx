import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { isCorrectGroup } from '../../../repository/firebase/groups/group-repository'
import { addDetailToUser } from '../../../repository/firebase/users/user-repository'
import {
  setCurrentGroupID,
  SetCurrentGroupIDAction,
} from '../../redux/user/user.actions'

export const joinGroup: (
  userAuth: firebase.User,
  displayName: string,
  groupID: string,
  navigation: RootScreenNavigationProp,
  dispatch: Dispatch<SetCurrentGroupIDAction>
) => void = async (userAuth, displayName, groupID, navigation, dispatch) => {
  const isCorrectGroupID = await isCorrectGroup(groupID)
  if (!isCorrectGroupID) {
    return Toast.show({
      text: 'このグループIDは存在しません',
      type: 'danger',
    })
  }

  const result = await addDetailToUser(userAuth, groupID, displayName)
  if (!result) {
    return Toast.show({
      text: 'ユーザー情報が不明です',
      type: 'danger',
    })
  }

  dispatch(setCurrentGroupID(groupID))

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
