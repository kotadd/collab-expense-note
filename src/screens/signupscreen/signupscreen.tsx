import { useNavigation } from '@react-navigation/native'
import { Container } from 'native-base'
import React from 'react'
import {
  AddInfoScreenNavigationProp,
  LoginScreenNavigationProp
} from '../../../AppContainer'
import SignupForm from '../../components/signup-form/signup-form.component'

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<
    AddInfoScreenNavigationProp | LoginScreenNavigationProp
  >()

  return (
    <Container>
      <SignupForm navigation={navigation} />
    </Container>
  )
}

export default SignupScreen
