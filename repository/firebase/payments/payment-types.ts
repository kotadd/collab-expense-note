export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _createdBy: string
  _updatedAt: firebase.firestore.Timestamp
  _updatedBy: firebase.firestore.Timestamp
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: firebase.firestore.Timestamp
  purchaseMemo: string
  shopName: string
  usage: string
  user: {
    ref: firebase.firestore.DocumentReference
  }
}

export type PaymentProps = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>

export type MonthlySummaryProps = {
  id: string
  groupAmount: number
  collectedGroupAmount: number
  uncollectedGroupAmount: number
  year: number
  month: number
}

export type MonthlyUserSummaryProps = {
  id: string
  uid: string
  paidAmount: number
  collectedAmount: number
  uncollectedAmount: number
  year: number
  month: number
}

export type ModalProps = {
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: Date
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
}
