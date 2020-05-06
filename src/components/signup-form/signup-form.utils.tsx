import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { auth } from '../../../repository/firebase/firebase.utils'
import { createPublicProfiles } from '../../../repository/firebase/public-profiles/public-profiles-repository'
import { setCurrentUser } from '../../redux/user/user.actions'
import { AuthScreenNavigationProp } from '../../../AppContainer'

const isValidPassword: (
  password: string,
  confirmPassword: string
) => boolean = (password, confirmPassword) => {
  if (password != confirmPassword) {
    Toast.show({
      text: 'パスワードと確認用パスワードが一致していません',
      type: 'danger',
    })
    return false
  }
  return true
}

export const createNewUser: (
  email: string,
  password: string,
  confirmPassword: string,
  dispatch: Dispatch,
  navigation: AuthScreenNavigationProp
) => Promise<void> = async (
  email,
  password,
  confirmPassword,
  dispatch,
  navigation
) => {
  if (!isValidPassword(password, confirmPassword)) return

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password)

    if (user) {
      await createPublicProfiles(user)
      dispatch(setCurrentUser(user))
      navigation.navigate('AddInfo')
    } else {
      dispatch(setCurrentUser({}))
      return Toast.show({
        text: '正しく登録できませんでした',
        type: 'danger',
      })
    }
  } catch (error) {
    if (error.message.match(/The email address is badly formatted./)) {
      return Toast.show({
        text: 'メールアドレスの形式が正しくありません',
        type: 'danger',
      })
    }
    if (error.message.match(/Password should be at least 6 characters/)) {
      return Toast.show({
        text: 'パスワードは6桁以上で入力して下さい',
        type: 'danger',
      })
    }
  }
}
