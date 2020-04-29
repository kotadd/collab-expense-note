import { Container } from 'native-base'
import React from 'react'
import SignupForm from '../../components/signup-form/signup-form.component'

const SignupScreen: React.FC = () => {
  return (
    <Container>
      <SignupForm />
    </Container>
  )
}

export default SignupScreen
