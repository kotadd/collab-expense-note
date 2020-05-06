import { Container, Content } from 'native-base'
import React from 'react'
import EditPaymentForm from '../../components/edit-payment-form/edit-payment-form.component'

const EditPaymentScreen: React.FC = () => (
  <Container>
    <Content>
      <EditPaymentForm />
    </Content>
  </Container>
)

export default EditPaymentScreen
