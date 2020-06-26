import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import {
  auth,
  fetchGroupIDByUID,
} from '../../../repository/firebase/firebase.utils'
import {
  setCurrentGroupID,
  setCurrentUser,
} from '../../redux/user/user.actions'

export const navigateFromLoginScreen: (
  userAuth: firebase.User,
  navigation: RootScreenNavigationProp,
  dispatch: Dispatch
) => Promise<void> = async (userAuth, navigation, dispatch) => {
  const groupID = await fetchGroupIDByUID(userAuth.uid)

  if (groupID) {
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
  } else {
    navigation.navigate('Auth', { screen: 'JoinGroup' })
  }
}

export const validateLogin: (
  email: string,
  password: string,
  dispatch: Dispatch,
  navigation: RootScreenNavigationProp
) => Promise<void> = async (email, password, dispatch, navigation) => {
  if (!email || !password) return
  try {
    const credentialedUser = await auth.signInWithEmailAndPassword(
      email,
      password
    )

    const userAuth = credentialedUser.user
    if (userAuth) {
      dispatch(setCurrentUser(userAuth))
      navigateFromLoginScreen(userAuth, navigation, dispatch)
    }
  } catch (error) {
    dispatch(setCurrentUser({}))
    Toast.show({
      text: 'ログイン情報が正しくありません',
      type: 'danger',
    })
  }
}
