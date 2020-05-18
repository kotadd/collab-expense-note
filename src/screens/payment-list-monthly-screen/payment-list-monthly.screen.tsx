import { Container, Content } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
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

const PaymentListMonthlyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const userList = useGroupUserList(currentUser, currentGroupID)

  useToast(currentUser)

  const selectedUserID =
    selectedUserName === 'all-items'
      ? ''
      : userList.find((user) => user.name === selectedUserName)?.id

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
            key={currentUser.uid}
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
