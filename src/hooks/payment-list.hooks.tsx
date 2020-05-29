import { Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import {
  setASpecificPayment,
  setMonthlyPayments,
  setSpecificMonthPayments,
} from '../../repository/firebase/payments/payment-repository'
import {
  MonthlySummaryProps,
  PaymentProps,
  PaymentType,
} from '../../repository/firebase/payments/payment-types'
import { fetchGroupMembers } from '../../repository/firebase/groups/group-repository'
import { MemberType } from '../redux/group/group.types'

export function useGroupUserList(
  members: MemberType[],
  currentUser: firebase.User,
  currentGroupID: string
): MemberType[] | undefined {
  const [userList, setUserList] = useState<MemberType[]>()

  useEffect(() => {
    const fetchGroupUserList: () => void = async () => {
      if (members.length > 0) return setUserList(members)

      await fetchGroupMembers(currentUser, currentGroupID, setUserList)
    }
    fetchGroupUserList()
  }, [members, currentUser, currentGroupID])

  return userList
}

export function useMonthlyPayments(
  uid: string,
  currentGroupID: string,
  selectedUserID?: string
): MonthlySummaryProps[] | undefined {
  const [payments, setPayments] = useState<MonthlySummaryProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      await setMonthlyPayments(uid, currentGroupID, setPayments, selectedUserID)
    }
    fetchPaymentsData()
  }, [uid, currentGroupID, selectedUserID])

  return payments
}

export function useSpecificMonthPayments(
  uid: string,
  currentGroupID: string,
  yearMonth: string,
  selectedUserID?: string
): PaymentProps[] | undefined {
  const [payments, setPayments] = useState<PaymentProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      await setSpecificMonthPayments(
        uid,
        currentGroupID,
        yearMonth,
        setPayments,
        selectedUserID
      )
    }
    fetchPaymentsData()
  }, [uid, currentGroupID, yearMonth, selectedUserID])

  return payments
}

export function useASpecificPayment(
  uid: string,
  currentGroupID: string,
  paymentID: string
): PaymentType | undefined {
  const [payment, setPayment] = useState<PaymentType>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      const payment = await setASpecificPayment(uid, currentGroupID, paymentID)
      setPayment(payment)
    }
    fetchPaymentsData()
  }, [uid, currentGroupID, paymentID])

  return payment
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
