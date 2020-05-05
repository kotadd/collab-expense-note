import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { loginUser } from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'

export const validateLogin: (
  email: string,
  password: string,
  dispatch: Dispatch,
  navigation: RootScreenNavigationProp
) => Promise<void> = async (email, password, dispatch, navigation) => {
  const userAuth = await loginUser(email, password)
  if (userAuth && userAuth.user) {
    dispatch(setCurrentUser(userAuth.user))
    navigation.navigate('Main', { screen: 'Monthly' })
  } else {
    dispatch(setCurrentUser({}))
    return Toast.show({
      text: 'ログイン情報が正しくありません',
      type: 'danger',
    })
  }
}
