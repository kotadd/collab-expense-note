import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import {
  DetailScreenNavigationProp,
  MainStackParamList,
} from '../../../AppContainer'
import {
  useGroupUserList,
  useSpecificMonthPayments,
} from '../../hooks/payment-list.hooks'
import { userSelector } from '../../redux/user/user.selector'
import PaymentListDailyContent from '../payment-list-daily-content/payment-list-daily-content.component'
import PaymentListDailyHeader from '../payment-list-daily-header/payment-list-daily-header.component'
import ToggleMember from '../toggle-member/toggle-member.component'

type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDaily: React.FC = (): ReactElement => {
  const currentUser = useSelector(userSelector)
  const userList = useGroupUserList(currentUser)

  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { yearMonth } = route.params

  navigation.setOptions({ headerTitle: yearMonth })

  const payments = useSpecificMonthPayments(currentUser, yearMonth)

  return (
    <>
      <ToggleMember
        key={currentUser.uid}
        userList={userList}
        selectedUser={currentUser.displayName}
      />
      <PaymentListDailyHeader />
      {payments &&
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
        })}
    </>
  )
}

export default PaymentListDaily
