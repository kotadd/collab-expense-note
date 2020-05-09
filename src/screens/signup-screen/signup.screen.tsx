import { Container, Content } from 'native-base'
import React from 'react'
import SignupForm from '../../components/signup-form/signup-form.component'

const SignupScreen: React.FC = () => {
  return (
    <Container>
      <Content>
        <SignupForm />
      </Content>
    </Container>
  )
}

export default SignupScreen
