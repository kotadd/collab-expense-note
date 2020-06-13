export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _createdBy: string
  _updatedAt: firebase.firestore.Timestamp
  _updatedBy: firebase.firestore.Timestamp
  collected: boolean
  groupAmount: number
  memberName: string
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
  collectedGroupAmount: number
  isCollected: boolean
  groupAmount: number
  month: number
  uncollectedGroupAmount: number
  year: number
}

export type MonthlyUserSummaryProps = {
  id: string
  collectedAmount: number
  isCollected: boolean
  month: number
  paidAmount: number
  uid: string
  uncollectedAmount: number
  year: number
}

export type ModalProps = {
  collected: boolean
  groupAmount: number
  memberName: string
  privateAmount: number
  purchaseDate: Date
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
}
