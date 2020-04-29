import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { Container } from 'native-base'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  MainScreenNavigationProp,
  SignupScreenNavigationProp,
} from '../../../AppContainer'
import { auth } from '../../../repository/firebase/firebase.utils'
import LoginForm from '../../components/login-form/login-form.component'
import { setCurrentUser } from '../../redux/user/user.actions'
import { fetchUserByUserAuth } from '../../../repository/firebase/users/user-repository'
import { fetchGroupByUser } from '../../../repository/firebase/groups/group-repository'

export type LoginNavigationProp = CompositeNavigationProp<
  MainScreenNavigationProp,
  SignupScreenNavigationProp
>

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<LoginNavigationProp>()

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) return
      const userInfo = await fetchUserByUserAuth(userAuth)
      const groupInfo = await fetchGroupByUser(userInfo)
      if (groupInfo && navigation) {
        dispatch(setCurrentUser(userAuth))
        navigation.navigate('Main')
      }
    })
  }, [])

  return (
    <Container>
      <LoginForm navigation={navigation} />
    </Container>
  )
}

export default LoginScreen
