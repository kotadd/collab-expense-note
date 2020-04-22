export type PaymentType = {
  _createdAt: firebase.firestore.FieldValue
  _updatedAt: firebase.firestore.FieldValue
  collected: boolean
  group: firebase.firestore.DocumentReference
  groupAmount: number
  groupID: string
  privateAmount: number
  purchaseDate: firebase.firestore.FieldValue
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  user: firebase.firestore.DocumentReference
}
