import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import {
  MainStackParamList,
  RootScreenNavigationProp,
} from '../../../AppContainer'
import HeaderRightCreateButton from '../../components/header/header-right-create-button.component'
import PaymentListDailyContent from '../../components/payment-list-daily-content/payment-list-daily-content.component'
import PaymentListDailyHeader from '../../components/payment-list-daily-header/payment-list-daily-header.component'
import ToggleMember from '../../components/toggle-member/toggle-member.component'
import {
  useGroupUserList,
  useSpecificMonthPayments,
} from '../../hooks/payment-list.hooks'
import {
  currentGroupIDSelector,
  currentUserSelector,
  selectedUserSelector,
} from '../../redux/user/user.selector'

type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDailyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const userList = useGroupUserList(currentUser, currentGroupID)

  const selectedUserID =
    selectedUserName === 'all-items'
      ? ''
      : userList.find((user) => user.name === selectedUserName)?.id

  const navigation = useNavigation<RootScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { yearMonth } = route.params

  navigation.setOptions({
    headerTitle: yearMonth,
    headerRight: (): ReactElement => {
      const rightButton = (
        <HeaderRightCreateButton
          navigation={navigation}
          from="daily"
          yearMonth={yearMonth}
        />
      )
      return rightButton
    },
  })

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
