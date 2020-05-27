import { Container, Content } from 'native-base'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PaymentListMonthlyContent from '../../components/payment-list-monthly-content/payment-list-monthly-content.component'
import PaymentListMonthlyHeader from '../../components/payment-list-monthly-header/payment-list-monthly-header.component'
import ToggleMember from '../../components/toggle-member/toggle-member.component'
import {
  useGroupUserList,
  useMonthlyPayments,
  useToast,
} from '../../hooks/payment-list.hooks'
import {
  currentGroupIDSelector,
  currentUserSelector,
  selectedUserSelector,
} from '../../redux/user/user.selector'
import { currentMemberSelector } from '../../redux/group/group.selector'
import {
  SetCurrentMemberAction,
  setCurrentMembers,
} from '../../redux/group/group.actions'
import { Dispatch } from 'redux'

const PaymentListMonthlyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const members = useSelector(currentMemberSelector)
  const userList = useGroupUserList(members, currentUser, currentGroupID)

  const dispatch = useDispatch<Dispatch<SetCurrentMemberAction>>()

  if (userList) {
    dispatch(setCurrentMembers(userList))
  }

  useToast(currentUser)

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

  const monthlyPayments = useMonthlyPayments(
    currentUser.uid,
    currentGroupID,
    selectedUserID
  )

  const monthlySummaries = monthlyPayments?.map((summary) => (
    <PaymentListMonthlyContent
      key={summary.id}
      yearMonth={summary.yearMonth}
      groupAmount={summary.groupAmount}
      unpaidAmount={summary.unpaidAmount}
    />
  ))

  return (
    <>
      <Container>
        <Content>
          <ToggleMember
            key={'ToggleMember-monthly'}
            userList={userList}
            selectedUserName={selectedUserName}
          />
          <PaymentListMonthlyHeader />
          {monthlySummaries}
        </Content>
      </Container>
    </>
  )
}

export default PaymentListMonthlyScreen
