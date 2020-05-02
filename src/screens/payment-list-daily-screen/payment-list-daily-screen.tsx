import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  DetailScreenNavigationProp,
  MainStackParamList,
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
} from '../../redux/user/user.selector'

type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDailyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const userList = useGroupUserList(currentUser)

  let targetUserID = '-1'

  if (selectedUserName === 'all-items') {
    targetUserID = currentUser.uid
  } else {
    const user = userList.find((user) => user.name === selectedUserName)
    if (user) {
      targetUserID = user.id
    }
  }

  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { yearMonth } = route.params

  navigation.setOptions({ headerTitle: yearMonth })

  const payments = useSpecificMonthPayments(targetUserID, yearMonth)

  const paymentListDailyContent = payments ? (
    payments.map((payment) => {
      return (
        <PaymentListDailyContent
          key={payment.id}
          navigation={navigation}
          payment={payment}
          yearMonth={yearMonth}
          payments={payments}
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
