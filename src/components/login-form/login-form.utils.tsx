import { Dispatch } from 'redux'
import { loginUser } from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import { Toast } from 'native-base'
import { MainScreenNavigationProp } from '../../../AppContainer'

type LoginNavigationProp = MainScreenNavigationProp

export const validateLogin: (
  email: string,
  password: string,
  dispatch: Dispatch,
  navigation: LoginNavigationProp
) => Promise<void> = async (email, password, dispatch, navigation) => {
  const userAuth = await loginUser(email, password)
  if (userAuth && userAuth.user) {
    dispatch(setCurrentUser(userAuth.user))
    navigation.navigate('Main')
  } else {
    dispatch(setCurrentUser({}))
    return Toast.show({
      text: 'ログイン情報が正しくありません',
      type: 'danger',
    })
  }
}
