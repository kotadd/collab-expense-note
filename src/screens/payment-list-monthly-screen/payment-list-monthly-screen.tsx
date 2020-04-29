import { Container, Content } from 'native-base'
import React from 'react'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'

const PaymentListMonthlyScreen: React.FC = () => (
  <Container>
    <Content>
      <PaymentListMonthly />
    </Content>
  </Container>
)

export default PaymentListMonthlyScreen
