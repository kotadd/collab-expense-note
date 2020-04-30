import { Container } from 'native-base'
import React from 'react'
import LoginForm from '../../components/login-form/login-form.component'

const LoginScreen: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  )
}

export default LoginScreen
