import { Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { fetchGroupUsers } from '../../repository/firebase/firebase.utils'
import {
  fetchSpecificMonthPayments,
  setCurrentPayments,
} from '../../repository/firebase/payments/payment-repository'
import { PaymentProps } from '../../repository/firebase/payments/payment-types'
import { UserListProps } from '../redux/types'

export function useGroupUserList(currentUser: firebase.User): UserListProps {
  const [userList, setUserList] = useState([{ id: '', name: '' }])

  useEffect(() => {
    const fetchGroupUserList: () => void = async () => {
      const userList = await fetchGroupUsers(currentUser)
      if (!userList) return
      setUserList(userList)
    }
    fetchGroupUserList()
  }, [currentUser])

  return userList
}

export function useCurrentPayments(uid: string): PaymentProps[] | undefined {
  const [payments, setPayments] = useState<PaymentProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      await setCurrentPayments(uid, setPayments)
    }
    fetchPaymentsData()
  }, [uid])

  return payments
}

export function useSpecificMonthPayments(
  currentUser: firebase.User,
  yearMonth: string
): PaymentProps[] | undefined {
  const [payments, setPayments] = useState<PaymentProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      const payments = await fetchSpecificMonthPayments(currentUser, yearMonth)
      setPayments(payments)
    }
    fetchPaymentsData()
  }, [currentUser, yearMonth])

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
  }, [currentUser])
}
