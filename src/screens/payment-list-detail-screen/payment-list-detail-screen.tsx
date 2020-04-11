import { Container } from 'native-base'
import React from 'react'
import PaymentListDetail from '../../components/payment-list-detail/payment-list-detail.component'
import { RouteProp } from '@react-navigation/native'
import { MainStackParamList } from '../../../AppContainer'

export type DetailScreenRouteProp = RouteProp<MainStackParamList, 'Detail'>

const PaymentListDetailScreen: React.FC = () => {
  return (
    <Container>
      <PaymentListDetail />
      {/* <NativeFooter /> */}
    </Container>
  )
}

export default PaymentListDetailScreen
