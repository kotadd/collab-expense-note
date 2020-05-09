import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import {
  auth,
  fetchGroupIDByUID,
} from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'

export const navigateFromLoginScreen: (
  userAuth: firebase.User,
  navigation: RootScreenNavigationProp
) => Promise<void> = async (userAuth, navigation) => {
  const groupID = await fetchGroupIDByUID(userAuth.uid)
  if (groupID) {
    navigation.navigate('Main', { screen: 'Monthly' })
  } else {
    navigation.navigate('Auth', { screen: 'Group' })
  }
}

export const validateLogin: (
  email: string,
  password: string,
  dispatch: Dispatch,
  navigation: RootScreenNavigationProp
) => Promise<void | null> = async (email, password, dispatch, navigation) => {
  if (!email || !password) return null
  const credentialedUser = await auth.signInWithEmailAndPassword(
    email,
    password
  )
  const userAuth = credentialedUser.user
  if (userAuth) {
    dispatch(setCurrentUser(userAuth))
    navigateFromLoginScreen(userAuth, navigation)
  } else {
    dispatch(setCurrentUser({}))
    Toast.show({
      text: 'ログイン情報が正しくありません',
      type: 'danger',
    })
  }
}
