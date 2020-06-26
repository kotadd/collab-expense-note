import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content, Card } from 'native-base'
import React, { ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { membersSelector } from '../../redux/group/group.selector'
import { Dispatch } from 'redux'
import {
  SetCurrentMemberAction,
  setCurrentMembers,
} from '../../redux/group/group.actions'

type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDailyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const members = useSelector(membersSelector)
  const userList = useGroupUserList(members, currentUser, currentGroupID)

  const dispatch = useDispatch<Dispatch<SetCurrentMemberAction>>()

  if (userList) {
    dispatch(setCurrentMembers(userList))
  }

  const selectedUserID = ((): string | null => {
    if (selectedUserName === 'all-items' || !userList) {
      return null
    }
    const user = userList.find((user) => user.displayName === selectedUserName)
    return user ? user.id : null
  })()

  const navigation = useNavigation<RootScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { year, month } = route.params

  const payments = useSpecificMonthPayments(
    currentUser.uid,
    currentGroupID,
    year,
    month,
    selectedUserID
  )

  const paymentListDailyContent = payments ? (
    payments.map((payment) => {
      return (
        <PaymentListDailyContent
          key={payment.id}
          navigation={navigation}
          payment={payment}
          year={year}
          month={month}
        />
      )
    })
  ) : (
    <></>
  )

  navigation.setOptions({
    headerTitle: `${year}年${month}月`,
    headerRight: (): ReactElement => {
      const rightButton = (
        <HeaderRightCreateButton
          navigation={navigation}
          from="daily"
          yearMonth={`${year}年${month}月`}
        />
      )
      return rightButton
    },
  })
  return (
    <>
      <Container>
        <Content>
          <Card key="PaymentListDailyScreen">
            <ToggleMember
              key={'DailyToggleMember'}
              userList={userList}
              selectedUserName={selectedUserName}
            />
            <PaymentListDailyHeader />
            {paymentListDailyContent}
          </Card>
        </Content>
      </Container>
    </>
  )
}

export default PaymentListDailyScreen
