import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { Container } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  MainScreenNavigationProp,
  SignupScreenNavigationProp,
} from '../../../AppContainer'
import {
  auth,
  fetchGroupByUser,
  fetchUserByUserAuth,
} from '../../../repository/firebase/firebase.utils'
import LoginForm from '../../components/login-form/login-form.component'
import { setCurrentUser } from '../../redux/user/user.actions'

export type LoginNavigationProp = CompositeNavigationProp<
  MainScreenNavigationProp,
  SignupScreenNavigationProp
>

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<LoginNavigationProp>()

  auth.onAuthStateChanged(async (userAuth) => {
    if (!userAuth) return
    const userInfo = await fetchUserByUserAuth(userAuth)
    const groupInfo = await fetchGroupByUser(userInfo)
    if (groupInfo && navigation) {
      dispatch(setCurrentUser(userAuth))
      navigation.navigate('Main')
    }
  })

  return (
    <Container>
      <LoginForm navigation={navigation} />
    </Container>
  )
}

export default LoginScreen
