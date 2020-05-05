import firebase from 'firebase/app'
import { fetchGroupIDByUID, firestore } from '../firebase.utils'
import { PaymentProps, PaymentType } from './payment-types'

export const setCurrentPayments: (
  uid: string,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>
) => Promise<() => void> = async (uid, setPayments) => {
  const groupID = await fetchGroupIDByUID(uid)

  const query = firestore
    .collection(`groups/${groupID}/payments`)
    .orderBy('purchaseDate', 'desc')

  const unsubscribedPayments = query.onSnapshot(
    (querySnapshot) => {
      setPayments(querySnapshot.docs)
    },
    () => {
      // FirebaseError: Missing or insufficient permissions になるため握り潰す
      // console.log(error)
    }
  )

  return unsubscribedPayments
}

export const setSpecificMonthPayments: (
  uid: string,
  yearMonth: string
) => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async (uid, yearMonth) => {
  const groupID = await fetchGroupIDByUID(uid)

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

  return payments.docs
}

export const setASpecificPayment: (
  uid: string,
  paymentID: string
) => Promise<PaymentType> = async (uid, paymentID) => {
  const groupID = await fetchGroupIDByUID(uid)

  const paymentSnapshot = await firestore
    .collection(`groups/${groupID}/payments`)
    .doc(paymentID)
    .get()

  return paymentSnapshot.data() as PaymentType
}
