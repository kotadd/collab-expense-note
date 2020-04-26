import { useFocusEffect } from '@react-navigation/native'
import { Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import {
  fetchCurrentPayments,
  fetchGroupUsers,
  timestampToLocaleDate,
} from '../../repository/firebase/firebase.utils'
import { UserListProps } from '../redux/types'
import {
  PaymentType,
  PaymentProps,
} from '../../repository/firebase/accounts/account-types'

export function useGroupUserList(currentUser: firebase.User): UserListProps {
  const [userList, setUserList] = useState([{ id: '', name: '' }])

  useEffect(() => {
    const fetchGroupUserList: () => void = async () => {
      const userList = await fetchGroupUsers(currentUser)
      if (!userList) return
      setUserList(userList)
    }
    fetchGroupUserList()
  }, [])

  return userList
}

export function useCurrentPayments(
  currentUser: firebase.User
): PaymentProps[] | undefined {
  const [payments, setPayments] = useState<PaymentProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      // const userInfo = await fetchUserByUserAuth(currentUser)
      // const payments = await fetchPaymentsByUser(userInfo)
      const payments = await fetchCurrentPayments(currentUser)

      // dispatch(setCurrentPayments(payments))
      setPayments(payments)
    }
    fetchPaymentsData()
  }, [])

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

export function useMontylyTotalPayments(paymentsMap: PaymentProps[]) {
  paymentsMap.map((payment) => {
    console.log(payment)
  })
  return
}
