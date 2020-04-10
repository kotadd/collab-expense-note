import { Content } from 'native-base'
import React from 'react'
import PaymentListDetail from '../../components/payment-list-detail/payment-list-detail.component'

const PaymentListDetailScreen: React.FC = () => {
  return (
    <Content>
      <PaymentListDetail />
      {/* <NativeFooter /> */}
    </Content>
  )
}

export default PaymentListDetailScreen
