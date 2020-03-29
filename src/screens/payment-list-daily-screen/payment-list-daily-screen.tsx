import { useNavigation, useRoute } from '@react-navigation/native'
import { Content } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DailyScreenRouteProp,
  DetailScreenNavigationProp
} from '../../../AppContainer'
import {
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import { fetchAllUserData } from '../../../repository/firebase/users/user-repository'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { isPaymentsUpdatedSelector } from '../../redux/account/account.selector'
import { UserListProps } from '../../redux/types'
import { userSelector } from '../../redux/user/user.selector'
import { findGroupUsers } from '../../utils/firebase.utils'

const PaymentListDailyScreen: React.FC = () => {
  const [userList, setUserList] = useState<UserListProps>({})
  const dispatch = useDispatch()
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const currentUser = useSelector(userSelector)
  const isPaymentsUpdated = useSelector(isPaymentsUpdatedSelector)

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const payments = await fetchPaymentsByUser(userInfo)
      dispatch(setCurrentPayments(payments))
    }
    fetchPaymentsData()
  }, [isPaymentsUpdated])

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
      <PaymentListDaily
        navigation={navigation}
        userList={userList}
        route={route}
      />
      {/* <NativeFooter /> */}
    </Content>
  )
}

export default PaymentListDailyScreen
