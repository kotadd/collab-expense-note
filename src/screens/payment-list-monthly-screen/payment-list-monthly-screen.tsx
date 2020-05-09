import { Container, Content } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import PaymentListMonthlyContent from '../../components/payment-list-monthly-content/payment-list-monthly-content.component'
import PaymentListMonthlyHeader from '../../components/payment-list-monthly-header/payment-list-monthly-header.component'
import ToggleMember from '../../components/toggle-member/toggle-member.component'
import {
  useCurrentPayments,
  useGroupUserList,
  useToast,
} from '../../hooks/payment-list.hooks'
import {
  currentUserSelector,
  selectedUserSelector,
} from '../../redux/user/user.selector'
import {
  calcMonthlyTotalPayments,
  isAllSelected,
} from './payment-list-monthly.utils'

const PaymentListMonthlyScreen: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const selectedUserName = useSelector(selectedUserSelector)
  const userList = useGroupUserList(currentUser)

  useToast(currentUser)

  const selectedUserID = isAllSelected(selectedUserName)
    ? ''
    : userList.find((user) => user.name === selectedUserName)?.id

  const payments = useCurrentPayments(currentUser.uid, selectedUserID)

  const paymentsMap = calcMonthlyTotalPayments(payments)
  const paymentListMonthlyContent = []
  const paymentsArr = Object.entries(paymentsMap)
  for (let i = 0; i < paymentsArr.length; i += 2) {
    const total = paymentsArr[i]
    const uncollected = paymentsArr[i + 1]
    const totalKey = total[0]
    const totalVal = total[1]
    const uncollectedVal = uncollected[1]

    const yearMonth = totalKey.split('_')[0]

    paymentListMonthlyContent.push(
      <PaymentListMonthlyContent
        key={totalKey}
        yearMonth={yearMonth}
        totalVal={totalVal}
        uncollectedVal={uncollectedVal}
      />
    )
  }

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
          {paymentListMonthlyContent}
        </Content>
      </Container>
    </>
  )
}

export default PaymentListMonthlyScreen
