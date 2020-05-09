import { Toast } from 'native-base'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { isCorrectGroup } from '../../../repository/firebase/groups/group-repository'
import { addDetailToUser } from '../../../repository/firebase/users/user-repository'

export const joinGroup: (
  userAuth: firebase.User,
  displayName: string,
  groupID: string,
  navigation: RootScreenNavigationProp
) => void = async (userAuth, displayName, groupID, navigation) => {
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
  navigation.navigate('Main', {
    screen: 'Monthly',
  })
}
