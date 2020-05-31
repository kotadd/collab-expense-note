import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Container, Content } from 'native-base'
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
import { currentMemberSelector } from '../../redux/group/group.selector'
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
  const members = useSelector(currentMemberSelector)
  const userList = useGroupUserList(members, currentUser, currentGroupID)

  const dispatch = useDispatch<Dispatch<SetCurrentMemberAction>>()

  if (userList) {
    dispatch(setCurrentMembers(userList))
  }

  const selectedUserID = ((): string => {
    if (selectedUserName === 'all-items') {
      return ''
    }
    if (!userList) {
      return ''
    }
    const user = userList.find((user) => user.displayName === selectedUserName)
    return user ? user.id : ''
  })()

  const navigation = useNavigation<RootScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const { year, month } = route.params

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

  return (
    <>
      <Container>
        <Content>
          <ToggleMember
            key={'DailyToggleMember'}
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
