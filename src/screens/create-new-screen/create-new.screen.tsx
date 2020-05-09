import { Container, Content } from 'native-base'
import React from 'react'
import CreatePaymentForm from '../../components/create-payment-form/create-payment-form.component'

const CreateNewScreen: React.FC = () => (
  <Container>
    <Content>
      <CreatePaymentForm />
    </Content>
  </Container>
)

export default CreateNewScreen
