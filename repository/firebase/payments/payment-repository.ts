import firebase from 'firebase/app'
import { fetchGroupIDByUID, firestore } from '../firebase.utils'
import { PaymentProps, PaymentType, ModalProps } from './payment-types'

export const setCurrentPayments: (
  uid: string,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>,
  selectedUserID?: string
) => Promise<() => void> = async (uid, setPayments, selectedUserID) => {
  const groupID = await fetchGroupIDByUID(uid)

  const query = selectedUserID
    ? firestore
        .collection(`groups/${groupID}/payments`)
        .where('user', '==', `users/${selectedUserID}`)
        .orderBy('purchaseDate', 'desc')
    : firestore
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

  const paymentSnapshots = await query.get()
  if (paymentSnapshots.size === 0) setPayments(undefined)

  return unsubscribedPayments
}

export const setSpecificMonthPayments: (
  uid: string,
  yearMonth: string,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>,
  selectedUserID?: string
) => Promise<() => void> = async (
  uid,
  yearMonth,
  setPayments,
  selectedUserID
) => {
  const groupID = await fetchGroupIDByUID(uid)

  const yearMonthArr = yearMonth.split('年')
  const year = parseInt(yearMonthArr[0])
  const month = parseInt(yearMonthArr[1].split('月')[0])

  const startDate = new Date(year, month - 1)
  const endDate = new Date(year, month)

  const startTimestamp = firebase.firestore.Timestamp.fromDate(startDate)
  const endTimestamp = firebase.firestore.Timestamp.fromDate(endDate)

  const query = selectedUserID
    ? firestore
        .collection(`groups/${groupID}/payments`)
        .where('user', '==', `user/${selectedUserID}`)
        .where('purchaseDate', '>=', startTimestamp)
        .where('purchaseDate', '<', endTimestamp)
        .orderBy('purchaseDate', 'desc')
    : firestore
        .collection(`groups/${groupID}/payments`)
        .where('purchaseDate', '>=', startTimestamp)
        .where('purchaseDate', '<', endTimestamp)
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

  const paymentSnapshots = await query.get()
  if (paymentSnapshots.size === 0) setPayments(undefined)

  return unsubscribedPayments
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

export const createPaymentsData: (
  userAuth: firebase.User,
  props: ModalProps
) => Promise<
  | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  | undefined
> = async (userAuth, props) => {
  if (!userAuth) return
  const profileSnapshot = await firestore.doc(`users/${userAuth.uid}`).get()
  const groupID = await profileSnapshot.get('groupID')

  const payment = {
    ...props,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    user: `user/${userAuth.uid}`,
  }
  const result = await firestore
    .collection(`groups/${groupID}/payments`)
    .add(payment)
  return result
}

export const editPaymentsData: (
  userAuth: firebase.User,
  props: ModalProps,
  paymentID: string
) => Promise<PaymentType> = async (userAuth, props, paymentID) => {
  if (!userAuth) return
  const profileSnapshot = await firestore.doc(`users/${userAuth.uid}`).get()
  const groupID = await profileSnapshot.get('groupID')

  const paymentRef = firestore.doc(`groups/${groupID}/payments/${paymentID}`)
  const paymentSnapshot = await paymentRef.get()

  if (!paymentSnapshot.exists) return

  const updateFields = {
    ...props,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }
  await paymentRef.update(updateFields)

  const payment = {
    ...updateFields,
    ...paymentSnapshot.get('_createdAt'),
  }

  return payment
}
