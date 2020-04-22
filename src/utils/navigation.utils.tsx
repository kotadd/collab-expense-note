import { auth } from '../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../redux/user/user.actions'
import { Toast } from 'native-base'
import { AuthScreenNavigationProp } from '../../AppContainer'

export async function logOut(
  navigation: AuthScreenNavigationProp
): Promise<void> {
  try {
    await auth.signOut()
    setCurrentUser({})
    navigation.navigate('Auth')
    Toast.show({
      text: 'ログアウトしました',
      type: 'success',
    })
  } catch (error) {
    console.log(error)
    Toast.show({
      text: 'ログアウトに失敗しました',
      type: 'danger',
    })
  }
}
