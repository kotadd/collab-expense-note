import { Container, Content } from 'native-base'
import React, { useEffect } from 'react'
import LoginForm from '../../components/login-form/login-form.component'
import { auth } from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import { navigateFromLoginScreen } from '../../components/login-form/login-form.utils'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { RootScreenNavigationProp } from '../../../AppContainer'

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<RootScreenNavigationProp>()

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) return
      dispatch(setCurrentUser(userAuth))
      navigateFromLoginScreen(userAuth, navigation, dispatch)
    })
  }, [dispatch, navigation])

  return (
    <Container>
      <Content>
        <LoginForm />
      </Content>
    </Container>
  )
}

export default LoginScreen
