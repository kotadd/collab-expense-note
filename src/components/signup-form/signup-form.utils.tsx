import { Toast } from 'native-base'
import { Dispatch } from 'redux'
import { auth } from '../../../repository/firebase/firebase.utils'
import { createUser } from '../../../repository/firebase/users/user-repository'
import {
  setCurrentUser,
  SetCurrentUserAction,
} from '../../redux/user/user.actions'
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
  dispatch: Dispatch<SetCurrentUserAction>,
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
      await createUser(user)
      dispatch(setCurrentUser(user))
      navigation.navigate('JoinGroup')
      Toast.show({
        text: 'アカウントを作成しました',
        type: 'success',
      })
    } else {
      dispatch(setCurrentUser({}))
      Toast.show({
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
    if (
      error.message.match(
        /The email address is already in use by another account./
      )
    ) {
      return Toast.show({
        text: 'そのメールアドレスはすでに利用されています',
        type: 'danger',
      })
    }
    console.log(error)
  }
}
