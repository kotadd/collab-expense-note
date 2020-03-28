export type PaymentProps = {
  payments: MonthlyPayments
}

export type MonthlyPayments = {
  [date: string]: [PaymentType]
}

export type PaymentType = {
  _createdAt?: firebase.firestore.Timestamp | Date
  _updatedAt?: firebase.firestore.Timestamp | Date
  collected: boolean
  date: firebase.firestore.Timestamp | Date
  groupAmount: number
  groupID: string
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  userAmount: number
  userID: string
}

export type CreatePaymentType = {
  _createdAt?: Date
  _updatedAt?: Date
  collected: boolean
  date: Date
  groupAmount: number
  groupID?: string
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  userAmount: number
  userID?: string
}
