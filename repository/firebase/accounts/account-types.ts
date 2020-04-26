// export type PaymentProps = {
//   payments: MonthlyPayments
// }

export type MonthlyPayments = {
  [date: string]: [PaymentType]
}

export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: firebase.firestore.Timestamp
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  user: firebase.firestore.CollectionReference
}

export type PaymentProps = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>

export type CreatePaymentProps = {
  payments: {
    [date: string]: [CreatePaymentType]
  }
}

// export type CreatePaymentType = {
//   _createdAt: firebase.firestore.FieldValue
//   _updatedAt: firebase.firestore.FieldValue
//   collected: boolean
//   date: Date
//   groupAmount: number
//   groupID?: string
//   purchaseMemo: string
//   shopName: string | 'その他'
//   usage: string | 'その他'
//   userAmount: number
//   userID?: string
// }

export type ModalType = {
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: Date
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
}
