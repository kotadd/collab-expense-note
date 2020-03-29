import { Container } from 'native-base'
import React from 'react'
import SignupForm from '../../components/signup-form/signup-form.component'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProp } from '../../../AppContainer'

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>()

  return (
    <Container>
      <SignupForm navigation={navigation} />
    </Container>
  )
}

export default SignupScreen
