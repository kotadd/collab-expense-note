import React from 'react'
import { useSelector } from 'react-redux'
import {
  useCurrentPayments,
  useGroupUserList,
  useToast,
} from '../../hooks/payment-list.hooks'
import {
  currentUserSelector,
  selectedUserSelector,
} from '../../redux/user/user.selector'
import PaymentListMonthlyContent from '../payment-list-monthly-content/payment-list-monthly-content.component'
import PaymentListMonthlyHeader from '../payment-list-monthly-header/payment-list-monthly-header.component'
import ToggleMember from '../toggle-member/toggle-member.component'
import { calcMonthlyTotalPayments } from './payment-list-monthly.utils'

const PaymentListMonthly: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const selectedUser = useSelector(selectedUserSelector)
  let targetUserID

  if (selectedUser.id === '-1') {
    targetUserID = currentUser.uid
  } else {
    targetUserID = selectedUser.id
  }

  const userList = useGroupUserList(currentUser)
  const payments = useCurrentPayments(targetUserID)

  // console.log(`payments: ${JSON.stringify(payments, null, ' ')}`)

  useToast(currentUser)

  const paymentsMap = calcMonthlyTotalPayments(payments)

  if (!paymentsMap) {
    return <></>
  }

  const dom = []
  const paymentsArr = Object.entries(paymentsMap)
  for (let i = 0; i < paymentsArr.length; i += 2) {
    const total = paymentsArr[i]
    const uncollected = paymentsArr[i + 1]
    const totalKey = total[0]
    const totalVal = total[1]
    const uncollectedVal = uncollected[1]

    const yearMonth = totalKey.split('_')[0]

    dom.push(
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
      <ToggleMember
        key={currentUser.uid}
        userList={userList}
        selectedUser={selectedUser}
      />
      <PaymentListMonthlyHeader />
      {dom}
    </>
  )
}

export default PaymentListMonthly
