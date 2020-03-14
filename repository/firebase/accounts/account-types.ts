export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  collected: boolean
  date: firebase.firestore.Timestamp
  groupAmount: number
  groupID: string
  purchaseMemo: string
  shopName: string
  usage: string
  userAmount: number
  userID: string
}

export type MonthlyPayments = {
  [date: string]: [PaymentType]
}

export type PaymentProps = {
  payments: MonthlyPayments
}

export type AccountProps = {
  account: PaymentProps
}

export type CreatePaymentType = {
  _createdAt?: firebase.firestore.Timestamp
  _updatedAt?: firebase.firestore.Timestamp
  collected: boolean
  date: Date
  groupAmount: number
  groupID?: string
  purchaseMemo: string
  shopName: string
  usage: string
  userAmount: number
  userID?: string
}
