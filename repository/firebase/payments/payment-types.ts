export type PaymentType = {
  _createdAt: firebase.firestore.FieldValue
  _updatedAt: firebase.firestore.FieldValue
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: firebase.firestore.FieldValue
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
  user: firebase.firestore.DocumentReference
}

export type PaymentProps = firebase.firestore.QueryDocumentSnapshot<
  firebase.firestore.DocumentData
>

export type ModalProps = {
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: Date
  purchaseMemo: string
  shopName: string | 'その他'
  usage: string | 'その他'
}
