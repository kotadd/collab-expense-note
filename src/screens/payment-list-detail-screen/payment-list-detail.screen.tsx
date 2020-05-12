import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { MainStackParamList } from '../../../AppContainer'
import Loading from '../../components/loading/loading.component'
import PaymentListDetailForm from '../../components/payment-list-detail-form/payment-list-detail-form.component'
import { useASpecificPayment } from '../../hooks/payment-list.hooks'
import {
  currentUserSelector,
  currentGroupIDSelector,
} from '../../redux/user/user.selector'
import HeaderRightEditButton from '../../components/header/header-right-edit-button.component'

type DetailScreenRouteProp = RouteProp<MainStackParamList, 'Detail'>

const PaymentListDetailScreen: React.FC = () => {
  const navigation = useNavigation()
  const route = useRoute<DetailScreenRouteProp>()
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)

  const { yearMonth, day, paymentID } = route.params

  const payment = useASpecificPayment(
    currentUser.uid,
    currentGroupID,
    paymentID
  )

  if (!payment) return <Loading />

  navigation.setOptions({
    headerTitle: `${yearMonth}${day}の支出`,
    headerRight: (): ReactElement => {
      const rightButton = (
        <HeaderRightEditButton
          navigation={navigation}
          payment={payment}
          paymentID={paymentID}
        />
      )
      return rightButton
    },
  })

  return (
    <Container>
      <Content>
        <PaymentListDetailForm payment={payment} disabled={true} />
      </Content>
    </Container>
  )
}

export default PaymentListDetailScreen
