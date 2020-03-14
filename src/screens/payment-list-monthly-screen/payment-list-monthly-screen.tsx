import { Container, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
  auth,
  fetchGroupUsers,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import { UserProps } from '../../../repository/firebase/users/user-types'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { setCurrentUser } from '../../redux/user/user.actions'
import { NavigationProps, NavigationType } from '../types'
import { AccountProps } from '../../../repository/firebase/accounts/account-types'

const userSelector = (state: UserProps) => state.user.currentUser
const accountSelector = (state: AccountProps) => state.account.payments

const PaymentListMonthlyScreen = () => {
  const [userList, setUserList] = useState({})
  const dispatch = useDispatch()

  const currentUser = useSelector(userSelector)
  const isPaymentsUpdated = useSelector(accountSelector)

  useEffect(() => {
    const fetchPaymentsData = async () => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const payments = await fetchPaymentsByUser(userInfo)
      dispatch(setCurrentPayments(payments))
    }
    fetchPaymentsData()
  }, [isPaymentsUpdated])

  useEffect(() => {
    const fetchGroupUserList = async () => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      if (!userInfo) return

      const userList = await fetchGroupUsers(userInfo)
      if (!userList) return
      setUserList(userList)
    }

    fetchGroupUserList()
  }, [])

  useEffect(() => {
    const showToast = () => {
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
      <PaymentListMonthly userList={userList} />
      {/* <NativeFooter /> */}
    </Container>
  )
}

const logOut = async (navigation: NavigationType) => {
  try {
    await auth.signOut()
    setCurrentUser({})
    navigation.navigate('Auth')
    Toast.show({
      text: 'ログアウトしました',
      type: 'success'
    })
  } catch (error) {
    console.log(error)
    Toast.show({
      text: 'ログアウトに失敗しました',
      type: 'danger'
    })
  }
}

const RightButton = () => {
  // const navigation = useNavigation<NavigationProps>()
  return (
    <Button
      title="＋"
      onPress={() =>
        // navigation.navigate('CreateNew', {
        //   from: 'monthly'
        // })
        console.log('------')
      }
    />
  )
}

const LeftButton = () => {
  const navigation = useNavigation<NavigationProps>()
  return <Button title="ログアウト" onPress={() => logOut(navigation)} />
}

PaymentListMonthlyScreen.navigationOptions = {
  title: '月ごとの支出',
  headerRight: RightButton,
  headerLeft: LeftButton
}

// const mapStateToProps = (state: ReduxAppState) => ({
//   currentUser: state.user.currentUser,
//   isPaymentsUpdated: state.account.isPaymentsUpdated
// })

// export default connect(mapStateToProps)(PaymentListMonthlyScreen)
export default PaymentListMonthlyScreen
