import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  MainStackParamList,
  MainScreenNavigationProp,
} from '../../../AppContainer'
import PaymentListDailyContent from '../../components/payment-list-daily-content/payment-list-daily-content.component'
import PaymentListDailyHeader from '../../components/payment-list-daily-header/payment-list-daily-header.component'
import ToggleMember from '../../components/toggle-member/toggle-member.component'
import {
  useGroupUserList,
  useSpecificMonthPayments,
} from '../../hooks/payment-list.hooks'
import {
  currentUserSelector,
  selectedUserSelector,
  currentGroupIDSelector,
} from '../../redux/user/user.selector'
import { isAllSelected } from '../payment-list-monthly-screen/payment-list-monthly.utils'

type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDailyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const userList = useGroupUserList(currentUser)

  const selectedUserID = isAllSelected(selectedUserName)
    ? ''
    : userList.find((user) => user.name === selectedUserName)?.id

  const navigation = useNavigation<MainScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { yearMonth } = route.params

  navigation.setOptions({ headerTitle: yearMonth })

  const payments = useSpecificMonthPayments(
    currentUser.uid,
    currentGroupID,
    yearMonth,
    selectedUserID
  )

  const paymentListDailyContent = payments ? (
    payments.map((payment) => {
      return (
        <PaymentListDailyContent
          key={payment.id}
          navigation={navigation}
          payment={payment}
          yearMonth={yearMonth}
        />
      )
    })
  ) : (
    <></>
  )

  return (
    <>
      <Container>
        <Content>
          <ToggleMember
            key={currentUser.uid}
            userList={userList}
            selectedUserName={selectedUserName}
          />
          <PaymentListDailyHeader />
          {paymentListDailyContent}
        </Content>
      </Container>
    </>
  )
}

export default PaymentListDailyScreen
