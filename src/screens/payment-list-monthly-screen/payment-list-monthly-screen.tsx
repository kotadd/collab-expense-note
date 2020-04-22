import { Container } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'
import { userSelector } from '../../redux/user/user.selector'
import {
  useGroupUserList,
  useCurrentPayments,
  useToast,
} from '../../hooks/payment-list.hooks'

const PaymentListMonthlyScreen: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(userSelector)
  const userList = useGroupUserList(currentUser)
  useCurrentPayments(currentUser, dispatch)
  useToast(currentUser)

  return (
    <Container>
      <PaymentListMonthly userList={userList} />
      {/* <NativeFooter /> */}
    </Container>
  )
}

export default PaymentListMonthlyScreen
