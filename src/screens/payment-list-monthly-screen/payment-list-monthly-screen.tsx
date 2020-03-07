import { Container, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { connect, useDispatch } from 'react-redux'
import {
  auth,
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { setCurrentUser } from '../../redux/user/user.actions'
import { findGroupUsers } from '../../utils'
import { AccountReduxTypes, NavigationType, UserReduxTypes } from '../types'
import { fetchAllUserData } from '../../../repository/firebase/users/user-repository'

const PaymentListMonthlyScreen = ({ currentUser, isPaymentsUpdated }) => {
  const [userList, setUserList] = useState({})
  const dispatch = useDispatch()
  const navigation = useNavigation()

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
      const group = await fetchGroupByUser(userInfo)
      if (!group) return
      const userIDs = group.userIDs

      const users = await fetchAllUserData()
      const userList = findGroupUsers(userIDs, users)
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
      <PaymentListMonthly navigation={navigation} userList={userList} />
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
  // const navigation = useNavigation()
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
  const navigation = useNavigation()
  return <Button title="ログアウト" onPress={() => logOut(navigation)} />
}

PaymentListMonthlyScreen.navigationOptions = {
  title: '月ごとの支出',
  headerRight: RightButton,
  headerLeft: LeftButton
}

const mapStateToProps = ({
  user,
  account
}: UserReduxTypes & AccountReduxTypes) => ({
  currentUser: user.currentUser,
  isPaymentsUpdated: account.isPaymentsUpdated
})

export default connect(mapStateToProps)(PaymentListMonthlyScreen)
