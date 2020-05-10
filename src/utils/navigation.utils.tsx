import { Toast } from 'native-base'
import { RootScreenNavigationProp } from '../../AppContainer'
import { auth } from '../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../redux/user/user.actions'

export async function logOut(
  navigation: RootScreenNavigationProp
): Promise<void> {
  try {
    await auth.signOut()
    setCurrentUser({})
    navigation.navigate('Auth', {
      screen: 'Login',
    })
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
