import { RouteProp } from '@react-navigation/native'
import { Container } from 'native-base'
import React from 'react'
import { MainStackParamList } from '../../../AppContainer'
import PaymentListDetail from '../../components/payment-list-detail/payment-list-detail.component'

export type DetailScreenRouteProp = RouteProp<MainStackParamList, 'Detail'>

const PaymentListDetailScreen: React.FC = () => {
  console.log('called screen')
  return (
    <Container>
      <PaymentListDetail />
      {/* <NativeFooter /> */}
    </Container>
  )
}

export default PaymentListDetailScreen
