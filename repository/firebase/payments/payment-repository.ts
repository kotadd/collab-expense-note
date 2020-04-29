import firebase from 'firebase/app'
import 'firebase/firestore'
import { fetchGroupIDByUserAuth } from '../firebase.utils'
import { PaymentProps } from './payment-types'
export const firestore = firebase.firestore()

export const fetchCurrentPayments = async (
  userAuth: firebase.User,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>
) => {
  const groupID = await fetchGroupIDByUserAuth(userAuth)

  const query = firestore
    .collection(`groups/${groupID}/payments`)
    .orderBy('purchaseDate', 'desc')

  const payments = await query.get()

  query.onSnapshot((querySnapshot) => {
    setPayments(querySnapshot.docs)
  })
  // payments.docs.map((payment) => {
  //   console.log('payment.id: ' + payment.id)
  // })

  return payments.docs
}

export const fetchSpecificMonthPayments = async (
  userAuth: firebase.User,
  yearMonth: string,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>
) => {
  const groupID = await fetchGroupIDByUserAuth(userAuth)

  const yearMonthArr = yearMonth.split('年')
  const year = parseInt(yearMonthArr[0])
  const month = parseInt(yearMonthArr[1].split('月')[0])

  const startDate = new Date(year, month - 1)
  const endDate = new Date(year, month)

  const startTimestamp = firebase.firestore.Timestamp.fromDate(startDate)
  const endTimestamp = firebase.firestore.Timestamp.fromDate(endDate)

  const query = firestore
    .collection(`groups/${groupID}/payments`)
    .where('purchaseDate', '>=', startTimestamp)
    .where('purchaseDate', '<', endTimestamp)
    .orderBy('purchaseDate', 'desc')

  const payments = await query.get()

  query.onSnapshot((querySnapshot) => {
    setPayments(querySnapshot.docs)
  })
  return payments.docs
}
