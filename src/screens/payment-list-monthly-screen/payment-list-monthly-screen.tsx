import { useNavigation } from '@react-navigation/native'
import { Container, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DailyScreenNavigationProp } from '../../../AppContainer'
import {
  fetchGroupUsers,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import {
  UserAuthType,
  UserProps
} from '../../../repository/firebase/users/user-types'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { AccountReduxProps } from '../../redux/account/account.reducer'

const PaymentListMonthlyScreen: React.FC = () => {
  const [userList, setUserList] = useState({})
  const dispatch = useDispatch()
  const navigation = useNavigation<DailyScreenNavigationProp>()

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
      }
    }
    showToast()
  }, [])

  return (
    <Container>
      <PaymentListMonthly userList={userList} navigation={navigation} />
      {/* <NativeFooter /> */}
    </Container>
  )
}

export default PaymentListMonthlyScreen
