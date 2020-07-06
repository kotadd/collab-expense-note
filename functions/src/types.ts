import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export type ParamsType = {
  [option: string]: any
}
export type SnapshotType = functions.firestore.QueryDocumentSnapshot

export type CreatePaymentProps = {
  collected: boolean
  groupAmount: number
  privateAmount: number
  purchaseDate: admin.firestore.Timestamp
  user: {
    ref: admin.firestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  }
}

export type UpdatePaymentProps = {
  collectedBefore: boolean
  collectedAfter: boolean
  groupAmountBefore: number
  groupAmountAfter: number
  privateAmountBefore: number
  privateAmountAfter: number
  purchaseDate: admin.firestore.Timestamp
  user: {
    ref: admin.firestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  }
}

export type CreateSourcePaymentProps = {
  year: number
  month: number
  paidAmount: number
  collectedAmount: number
  uncollectedAmount: number
  user?: {
    ref: admin.firestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  }
}

export type UpdateSourcePaymentProps = {
  year: number
  month: number
  paidAmountDiff: number
  collectedAmountDiff: number
  uncollectedAmountDiff: number
  user?: {
    ref: admin.firestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
  }
}
