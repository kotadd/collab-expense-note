import { Container } from 'native-base'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'
import {
  useCurrentPayments,
  useGroupUserList,
} from '../../hooks/payment-list.hooks'
import { userSelector } from '../../redux/user/user.selector'

const PaymentListDailyScreen: React.FC = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(userSelector)
  const userList = useGroupUserList(currentUser)
  useCurrentPayments(currentUser, dispatch)

  return (
    <Container>
      <PaymentListDaily userList={userList} />
    </Container>
  )
}

export default PaymentListDailyScreen
