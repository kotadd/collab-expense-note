import { useNavigation, useRoute } from '@react-navigation/native'
import { Content } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DetailScreenNavigationProp,
  DailyScreenRouteProp
} from '../../../AppContainer'
import {
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import { fetchAllUserData } from '../../../repository/firebase/users/user-repository'
import {
  UserAuthType,
  UserProps
} from '../../../repository/firebase/users/user-types'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { AccountReduxProps } from '../../redux/account/account.reducer'
import { UserListProps } from '../../redux/types'
import { findGroupUsers } from '../../utils/firebase.utils'

const PaymentListDailyScreen: React.FC = () => {
  const [userList, setUserList] = useState<UserListProps>({})
  const dispatch = useDispatch()
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()

  const userSelector: (state: UserProps) => UserAuthType = state =>
    state.user.currentUser
  const isPaymentsUpdatedSelector: (
    state: AccountReduxProps
  ) => boolean = state => state.isPaymentsUpdated

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
