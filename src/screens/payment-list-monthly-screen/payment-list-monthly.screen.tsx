import { Container, Content, Card } from 'native-base'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PaymentListMonthlyContent from '../../components/payment-list-monthly-content/payment-list-monthly-content.component'
import PaymentListMonthlyHeader from '../../components/payment-list-monthly-header/payment-list-monthly-header.component'
import ToggleMember from '../../components/toggle-member/toggle-member.component'
import {
  useGroupUserList,
  useMonthlyPayments,
  useToast,
  useMonthlyUserPayments,
} from '../../hooks/payment-list.hooks'
import {
  currentGroupIDSelector,
  currentUserSelector,
  selectedUserSelector,
} from '../../redux/user/user.selector'
import {
  membersSelector,
  monthlySummariesSelector,
  monthlyUserSummariesSelector,
} from '../../redux/group/group.selector'
import {
  SetCurrentMemberAction,
  setCurrentMembers,
  SetMonthlySummaryAction,
  SetMonthlyUserSummaryAction,
  setMonthlySummaries,
  setMonthlyUserSummaries,
} from '../../redux/group/group.actions'
import { Dispatch } from 'redux'

const PaymentListMonthlyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const members = useSelector(membersSelector)
  const userList = useGroupUserList(members, currentUser, currentGroupID)
  const groupPayments = useSelector(monthlySummariesSelector)
  const userPayments = useSelector(monthlyUserSummariesSelector)

  const dispatch = useDispatch<
    Dispatch<
      | SetCurrentMemberAction
      | SetMonthlySummaryAction
      | SetMonthlyUserSummaryAction
    >
  >()

  if (userList) dispatch(setCurrentMembers(userList))

  useToast(currentUser)

  const selectedUserID = ((): string | null => {
    if (selectedUserName === 'all-items' || !userList) {
      return null
    }
    const user = userList.find((user) => user.displayName === selectedUserName)
    return user ? user.id : null
  })()

  const monthlyPayments = useMonthlyPayments(
    groupPayments,
    currentUser.uid,
    currentGroupID
  )
  if (monthlyPayments) dispatch(setMonthlySummaries(monthlyPayments))

  const monthlyUserPayments = useMonthlyUserPayments(
    userPayments,
    currentUser.uid,
    currentGroupID
  )
  if (monthlyUserPayments) {
    dispatch(setMonthlyUserSummaries(monthlyUserPayments))
  }

  const monthlySummaries = ((): JSX.Element[] | undefined => {
    if (selectedUserID) {
      const summaries = monthlyUserPayments?.filter(
        (summary) => summary.uid === selectedUserID
      )
      return summaries?.map((summary) => (
        <PaymentListMonthlyContent
          key={summary.id}
          year={summary.year}
          month={summary.month}
          groupAmount={summary.paidAmount}
          uncollectedAmount={summary.uncollectedAmount}
        />
      ))
    } else {
      return monthlyPayments?.map((summary) => (
        <PaymentListMonthlyContent
          key={summary.id}
          year={summary.year}
          month={summary.month}
          groupAmount={summary.groupAmount}
          uncollectedAmount={summary.uncollectedGroupAmount}
        />
      ))
    }
  })()

  return (
    <>
      <Container>
        <Content>
          <Card key="PaymentListMonthlyScreen">
            <ToggleMember
              key={'MonthlyToggleMember'}
              userList={userList}
              selectedUserName={selectedUserName}
            />
            <PaymentListMonthlyHeader />
            {monthlySummaries}
          </Card>
        </Content>
      </Container>
    </>
  )
}

export default PaymentListMonthlyScreen
