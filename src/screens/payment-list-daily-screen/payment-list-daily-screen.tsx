import { Container, Content } from 'native-base'
import React from 'react'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'

const PaymentListDailyScreen: React.FC = () => (
  <Container>
    <Content>
      <PaymentListDaily />
    </Content>
  </Container>
)

export default PaymentListDailyScreen
