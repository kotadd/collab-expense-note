import { Container, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchGroupUsers,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { userSelector } from '../../redux/user/user.selector'
import { useFocusEffect } from '@react-navigation/native'

const PaymentListMonthlyScreen: React.FC = () => {
  const [userList, setUserList] = useState({})
  const dispatch = useDispatch()
  const currentUser = useSelector(userSelector)

  useFocusEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const payments = await fetchPaymentsByUser(userInfo)
      dispatch(setCurrentPayments(payments))
    }
    fetchPaymentsData()
  })

  useEffect(() => {
    const fetchGroupUserList = async (): Promise<void> => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      if (!userInfo) return

      const userList = await fetchGroupUsers(userInfo)
      if (!userList) return
      setUserList(userList)
    }
    fetchGroupUserList()
  }, [])

  useEffect(() => {
    const showToast = (): void => {
      if (currentUser) {
        Toast.show({
          text: 'ログインしました',
          type: 'success'
        })
        Keyboard.dismiss()
      }
    }
    showToast()
  }, [])

  return (
    <Container>
      <PaymentListMonthly userList={userList} />
      {/* <NativeFooter /> */}
    </Container>
  )
}

export default PaymentListMonthlyScreen
