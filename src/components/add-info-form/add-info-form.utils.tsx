import { addDetailToProfile } from '../../../repository/firebase/public-profiles/public-profiles-repository'
import { Toast } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../AppContainer'

export const addGroupInfo: (
  name: string,
  selectedGroupId: string,
  currentUser: firebase.User,
  navigation: StackNavigationProp<RootStackParamList, 'Main'>
) => void = async (name, selectedGroupId, currentUser, navigation) => {
  try {
    const result = await addDetailToProfile(currentUser, selectedGroupId, name)

    if (!result) {
      return Toast.show({
        text: 'ユーザー情報が不明です',
        type: 'danger',
      })
    }
    navigation.navigate('Main')
  } catch (error) {
    return Toast.show({
      text: 'ユーザーの情報を追加するのに失敗しました。',
      type: 'danger',
    })
  }
}
