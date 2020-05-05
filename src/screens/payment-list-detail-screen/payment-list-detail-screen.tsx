import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import React from 'react'
import { MainStackParamList } from '../../../AppContainer'
import PaymentListDetailForm from '../../components/payment-list-detail-form/payment-list-detail-form.component'
import Loading from '../../components/loading/loading.component'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../redux/user/user.selector'
import { useASpecificPayment } from '../../hooks/payment-list.hooks'

export type DetailScreenRouteProp = RouteProp<MainStackParamList, 'Detail'>

const PaymentListDetailScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<DetailScreenRouteProp>()
  const currentUser = useSelector(currentUserSelector)

  const { yearMonth, day, paymentID } = route.params

  navigation.setOptions({ headerTitle: `${yearMonth}${day}の支出` })

  const payment = useASpecificPayment(currentUser.uid, paymentID)

  if (!payment) return <Loading />

  return (
    <Container>
      <Content>
        <PaymentListDetailForm payment={payment} disabled={true} />
      </Content>
    </Container>
  )
}

export default PaymentListDetailScreen
