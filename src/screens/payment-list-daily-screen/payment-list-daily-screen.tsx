import { Content } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import {
  fetchAllUserData,
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../repository/firebase/firebase.utils'
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component'
import { setCurrentPayments } from '../../redux/account/account.actions'
import { findGroupUsers } from '../../utils'
import {
  NavigationProps,
  UserProps,
  UserAuthType,
  UserReduxTypes
} from '../types'

const PaymentListDailyScreen = ({
  currentUser,
  navigation
}: UserReduxTypes & NavigationProps) => {
  const [userList, setUserList] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const payments = await fetchPaymentsByUser(userInfo)

      dispatch(setCurrentPayments(payments))
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const group = await fetchGroupByUser(userInfo)
      if (!group) return
      const userIDs = group.userIDs

      const users = await fetchAllUserData()
      const userList = findGroupUsers(userIDs, users)

      setUserList(userList)
    }
    fetchData()
  }, [])
  return (
    <Content>
      <PaymentListDaily navigation={navigation} userList={userList} />
      {/* <NativeFooter /> */}
    </Content>
  )
}

PaymentListDailyScreen.navigationOptions = ({
  navigation
}: NavigationProps) => {
  const date = navigation.state.params ? navigation.state.params.date : null
  let title = '日付ごとの支出'
  if (date) title = `${date}の支出`

  return {
    title,
    headerRight: () => (
      <Button
        title="＋"
        onPress={() =>
          navigation.navigate('CreateNew', {
            from: 'daily'
          })
        }
      />
    )
  }
}

const mapStateToProps = ({ user }: UserProps) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(PaymentListDailyScreen)
