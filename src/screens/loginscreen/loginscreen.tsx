import { Container } from 'native-base'
import React from 'react'
import { useDispatch } from 'react-redux'
import {
  auth,
  fetchGroupByUser
} from '../../../repository/firebase/firebase.utils'
import LoginForm from '../../components/login-form/login-form.component'
import { setCurrentUser } from '../../redux/user/user.actions'
import { useNavigation } from '@react-navigation/native'

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  auth.onAuthStateChanged(async userAuth => {
    if (!userAuth) return
    const groupInfo = await fetchGroupByUser(userAuth)
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
