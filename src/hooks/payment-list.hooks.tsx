import { useFocusEffect } from '@react-navigation/native'
import { Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { Dispatch } from 'redux'
import {
  fetchGroupUsers,
  fetchPaymentsByUser,
  fetchUserByUserAuth,
} from '../../repository/firebase/firebase.utils'
import { setCurrentPayments } from '../redux/account/account.actions'

export function useGroupUserList(currentUser: firebase.User): {} {
  const [userList, setUserList] = useState({})

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

  return userList
}

export function useCurrentPayments(
  currentUser: firebase.User,
  dispatch: Dispatch
): {} {
  const [payments] = useState({})

  useFocusEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      const userInfo = await fetchUserByUserAuth(currentUser)
      const payments = await fetchPaymentsByUser(userInfo)
      dispatch(setCurrentPayments(payments))
    }
    fetchPaymentsData()
  })

  return payments
}

export function useToast(currentUser: firebase.User): void {
  useEffect(() => {
    const showToast = (): void => {
      if (currentUser) {
        Toast.show({
          text: 'ログインしました',
          type: 'success',
        })
        Keyboard.dismiss()
      }
    }
    showToast()
  }, [])
}
