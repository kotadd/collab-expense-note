import { Toast } from 'native-base'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import {
  setASpecificPayment,
  setMonthlyPayments,
  setSpecificMonthPayments,
  setMonthlyUserPayments,
} from '../../repository/firebase/payments/payment-repository'
import {
  MonthlySummaryProps,
  PaymentProps,
  PaymentType,
  MonthlyUserSummaryProps,
} from '../../repository/firebase/payments/payment-types'
import { fetchGroupMembers } from '../../repository/firebase/groups/group-repository'
import {
  MemberType,
  MonthlySummaryType,
  MonthlyUserSummaryType,
} from '../redux/group/group.types'

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
  groupPayments: MonthlySummaryType[],
  uid: string,
  currentGroupID: string
): MonthlySummaryProps[] | undefined {
  const [payments, setPayments] = useState<MonthlySummaryProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      if (groupPayments.length > 0) return setPayments(groupPayments)
      await setMonthlyPayments(uid, currentGroupID, setPayments)
    }
    fetchPaymentsData()
  }, [groupPayments, uid, currentGroupID])

  return payments
}

export function useMonthlyUserPayments(
  userPayments: MonthlyUserSummaryType[],
  uid: string,
  currentGroupID: string
): MonthlyUserSummaryProps[] | undefined {
  const [payments, setPayments] = useState<MonthlyUserSummaryProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      if (userPayments.length > 0) return setPayments(userPayments)
      await setMonthlyUserPayments(uid, currentGroupID, setPayments)
    }
    fetchPaymentsData()
  }, [userPayments, uid, currentGroupID])

  return payments
}

export function useSpecificMonthPayments(
  uid: string,
  currentGroupID: string,
  year: number,
  month: number,
  selectedUserID?: string
): PaymentProps[] | undefined {
  const [payments, setPayments] = useState<PaymentProps[]>()

  useEffect(() => {
    const fetchPaymentsData = async (): Promise<void> => {
      await setSpecificMonthPayments(
        uid,
        currentGroupID,
        year,
        month,
        setPayments,
        selectedUserID
      )
    }
    fetchPaymentsData()
  }, [uid, currentGroupID, year, month, selectedUserID])

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
