import { Toast } from 'native-base'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { addDetailToProfile } from '../../../repository/firebase/public-profiles/public-profiles-repository'

export const addGroupInfo: (
  displayName: string,
  selectedGroupId: string,
  currentUser: firebase.User,
  navigation: RootScreenNavigationProp
) => void = async (displayName, selectedGroupId, currentUser, navigation) => {
  try {
    const result = await addDetailToProfile(
      currentUser,
      selectedGroupId,
      displayName
    )

    if (!result) {
      return Toast.show({
        text: 'ユーザー情報が不明です',
        type: 'danger',
      })
    }
    navigation.navigate('Main', {
      screen: 'Monthly',
    })
  } catch (error) {
    return Toast.show({
      text: 'ユーザーの情報を追加するのに失敗しました。',
      type: 'danger',
    })
  }
}
