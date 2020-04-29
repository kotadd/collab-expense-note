import firebase from 'firebase/app'
import {
  fetchGroupIDByUID,
  fetchGroupIDByUserAuth,
  firestore,
} from '../firebase.utils'
import { PaymentProps } from './payment-types'

export const setCurrentPayments: (
  selectedUser: string,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>
) => Promise<() => void> = async (selectedUser, setPayments) => {
  const groupID = await fetchGroupIDByUID(selectedUser)

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

export const fetchSpecificMonthPayments: (
  userAuth: firebase.User,
  yearMonth: string
) => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async (userAuth: firebase.User, yearMonth: string) => {
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

  // query.onSnapshot((querySnapshot) => {
  //   setPayments(querySnapshot.docs)
  // })

  return payments.docs
}
