import { Container } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  auth,
  fetchGroupByUser
} from '../../../repository/firebase/firebase.utils'
import LoginForm from '../../components/login-form/login-form.component'
import { setCurrentUser } from '../../redux/user/user.actions'
import { NavigationProps } from '../types'

const LoginScreen: NavigationProps = ({ navigation }: NavigationProps) => {
  const dispatch = useDispatch()
  auth.onAuthStateChanged(async userAuth => {
    if (!userAuth) return
    const groupInfo = await fetchGroupByUser(userAuth)
    if (groupInfo && navigation) {
      dispatch(setCurrentUser(userAuth))
      navigation.navigate('App')
    }
  })

  return (
    <Container>
      <LoginForm navigation={navigation} />
    </Container>
  )
}

LoginScreen.navigationOptions = {
  title: 'ログイン'
}

export default LoginScreen
