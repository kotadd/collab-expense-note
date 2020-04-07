import { RouteProp, useFocusEffect } from '@react-navigation/native'
import { Content } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MainStackParamList } from '../../../AppContainer'
import {
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import { fetchAllUserData } from '../../../repository/firebase/users/user-repository'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { UserListProps } from '../../redux/types'
import { userSelector } from '../../redux/user/user.selector'
import { findGroupUsers } from '../../utils/firebase.utils'

export type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

const PaymentListDailyScreen: React.FC = () => {
  const [userList, setUserList] = useState<UserListProps>({})
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
      const group = await fetchGroupByUser(userInfo)
      if (!group) return
      const userIDs = group.userIDs

      const users = await fetchAllUserData()
      const userList = findGroupUsers(userIDs, users)
      setUserList(userList)
    }
    fetchGroupUserList()
  }, [])

  return (
    <Content>
      <PaymentListDaily userList={userList} />
      {/* <NativeFooter /> */}
    </Content>
  )
}

export default PaymentListDailyScreen
