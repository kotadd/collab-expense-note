import { Toast } from 'native-base'
import { MainScreenNavigationProp } from '../../../AppContainer'
import { addDetailToProfile } from '../../../repository/firebase/public-profiles/public-profiles-repository'

export const addGroupInfo: (
  name: string,
  selectedGroupId: string,
  currentUser: firebase.User,
  navigation: MainScreenNavigationProp
) => void = async (name, selectedGroupId, currentUser, navigation) => {
  try {
    const result = await addDetailToProfile(currentUser, selectedGroupId, name)

    if (!result) {
      return Toast.show({
        text: 'ユーザー情報が不明です',
        type: 'danger',
      })
    }
    navigation.navigate('Monthly')
  } catch (error) {
    return Toast.show({
      text: 'ユーザーの情報を追加するのに失敗しました。',
      type: 'danger',
    })
  }
}
