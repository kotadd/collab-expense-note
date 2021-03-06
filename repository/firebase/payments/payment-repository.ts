import firebase from 'firebase/app'
import { fetchGroupIDByUID, firestore } from '../firebase.utils'
import {
  ModalProps,
  MonthlySummaryProps,
  MonthlyUserSummaryProps,
  PaymentProps,
  PaymentType,
} from './payment-types'

export const setMonthlyPayments: (
  uid: string,
  currentGroupID: string,
  setPayments: React.Dispatch<
    React.SetStateAction<MonthlySummaryProps[] | undefined>
  >
) => Promise<() => void> = async (uid, currentGroupID, setPayments) => {
  const groupID = currentGroupID ? currentGroupID : await fetchGroupIDByUID(uid)

  const query = firestore
    .collection(`groups/${groupID}/monthly-summaries`)
    .orderBy('year', 'desc')
    .orderBy('month', 'desc')

  const unsubscribedPayments = query.onSnapshot(
    (querySnapshot) => {
      const map: MonthlySummaryProps[] = querySnapshot.docs.map((summary) => {
        return {
          id: summary.id,
          collectedGroupAmount: summary.get('collectedGroupAmount'),
          groupAmount: summary.get('groupAmount'),
          isCollected: summary.get('isCollected'),
          month: summary.get('month'),
          uncollectedGroupAmount: summary.get('uncollectedGroupAmount'),
          year: summary.get('year'),
        }
      })
      setPayments(map)
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

export const setMonthlyUserPayments: (
  uid: string,
  currentGroupID: string,
  setPayments: React.Dispatch<
    React.SetStateAction<MonthlyUserSummaryProps[] | undefined>
  >
) => Promise<() => void> = async (uid, currentGroupID, setPayments) => {
  const groupID = currentGroupID ? currentGroupID : await fetchGroupIDByUID(uid)

  const query = firestore
    .collection(`groups/${groupID}/monthly-user-summaries`)
    .orderBy('year', 'desc')
    .orderBy('month', 'desc')

  const unsubscribedPayments = query.onSnapshot(
    (querySnapshot) => {
      const map: MonthlyUserSummaryProps[] = querySnapshot.docs.map(
        (summary) => {
          return {
            id: summary.id,
            uid: summary.get('user.id'),
            collectedAmount: summary.get('collectedAmount'),
            isCollected: summary.get('isCollected'),
            month: summary.get('month'),
            paidAmount: summary.get('paidAmount'),
            uncollectedAmount: summary.get('uncollectedAmount'),
            year: summary.get('year'),
          }
        }
      )
      setPayments(map)
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
  currentGroupID: string,
  year: number,
  month: number,
  setPayments: React.Dispatch<React.SetStateAction<PaymentProps[] | undefined>>,
  selectedUserID: string | null
) => Promise<() => void> = async (
  uid,
  currentGroupID,
  year,
  month,
  setPayments,
  selectedUserID
) => {
  const groupID = currentGroupID ? currentGroupID : await fetchGroupIDByUID(uid)

  const startDate = new Date(year, month - 1)
  const endDate = new Date(year, month)

  const startTimestamp = firebase.firestore.Timestamp.fromDate(startDate)
  const endTimestamp = firebase.firestore.Timestamp.fromDate(endDate)

  const query = selectedUserID
    ? firestore
        .collection(`groups/${groupID}/payments`)
        .where('user.ref', '==', firestore.doc(`users/${selectedUserID}`))
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
  currentGroupID: string,
  paymentID: string
) => Promise<PaymentType> = async (uid, currentGroupID, paymentID) => {
  const groupID = currentGroupID ? currentGroupID : await fetchGroupIDByUID(uid)

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
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await userRef.get()
  const groupID: string = await userSnapshot.get('groupID')
  const displayName: string = await userSnapshot.get('displayName')

  const payment = {
    ...props,
    _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    _createdBy: displayName,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    _updatedBy: '',
    user: {
      ref: userRef,
    },
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
  const userSnapshot = await firestore.doc(`users/${userAuth.uid}`).get()
  const groupID: string = await userSnapshot.get('groupID')
  const displayName: string = await userSnapshot.get('displayName')

  const paymentRef = firestore.doc(`groups/${groupID}/payments/${paymentID}`)
  const paymentSnapshot = await paymentRef.get()

  if (!paymentSnapshot.exists) return

  const updateFields = {
    ...props,
    _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    _updatedBy: displayName,
  }
  await paymentRef.update(updateFields)

  const payment = {
    ...updateFields,
    ...paymentSnapshot.get('_createdAt'),
  }

  return payment
}
