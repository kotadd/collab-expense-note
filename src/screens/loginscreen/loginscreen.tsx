import { Container, Content } from 'native-base'
import React from 'react'
import LoginForm from '../../components/login-form/login-form.component'

const LoginScreen: React.FC = () => {
  return (
    <Container>
      <Content>
        <LoginForm />
      </Content>
    </Container>
  )
}

export default LoginScreen
