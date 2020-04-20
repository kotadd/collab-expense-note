export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  collected: boolean
  date: firebase.firestore.Timestamp
  groupAmount: number
  groupID: string
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  userAmount: number
  userID: string
}
