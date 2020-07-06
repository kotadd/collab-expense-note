import {
  CreatePaymentProps,
  UpdatePaymentProps,
  UpdateSourcePaymentProps,
} from './types'
import * as functions from 'firebase-functions'

export function getCreatePaymentValues(
  snapshot: functions.firestore.QueryDocumentSnapshot
): CreatePaymentProps {
  return {
    collected: snapshot.get('collected'),
    groupAmount: snapshot.get('groupAmount'),
    privateAmount: snapshot.get('privateAmount'),
    purchaseDate: snapshot.get('purchaseDate'),
    user: {
      ref: snapshot.get('user.ref'),
    },
  }
}

export function getUpdatePaymentValues(
  snapshot: functions.Change<functions.firestore.QueryDocumentSnapshot>
): UpdatePaymentProps {
  return {
    collectedBefore: snapshot.before.get('collected'),
    collectedAfter: snapshot.after.get('collected'),
    groupAmountBefore: snapshot.before.get('groupAmount'),
    groupAmountAfter: snapshot.after.get('groupAmount'),
    privateAmountBefore: snapshot.before.get('privateAmount'),
    privateAmountAfter: snapshot.after.get('privateAmount'),
    purchaseDate: snapshot.after.get('purchaseDate'),
    user: {
      ref: snapshot.before.get('user.ref'),
    },
  }
}

export function useCreateSourcePayments(paymentValues: CreatePaymentProps) {
  const paidAmount = paymentValues.groupAmount - paymentValues.privateAmount
  return {
    year: paymentValues.purchaseDate.toDate().getFullYear(),
    month: paymentValues.purchaseDate.toDate().getMonth() + 1,
    paidAmount: paidAmount,
    collectedAmount: paymentValues.collected ? paidAmount : 0,
    uncollectedAmount: paymentValues.collected ? 0 : paidAmount,
    user: paymentValues.user,
  }
}

export function useUpdateSourcePayments(
  paymentValues: UpdatePaymentProps
): UpdateSourcePaymentProps {
  const paidAmountBefore =
    paymentValues.groupAmountBefore - paymentValues.privateAmountBefore
  const paidAmountAfter =
    paymentValues.groupAmountAfter - paymentValues.privateAmountAfter
  const paidAmountDiff = paidAmountAfter - paidAmountBefore

  const collectedAmountBefore = paymentValues.collectedBefore
    ? paymentValues.groupAmountBefore - paymentValues.privateAmountBefore
    : 0

  const collectedAmountAfter = paymentValues.collectedAfter
    ? paymentValues.groupAmountAfter - paymentValues.privateAmountAfter
    : 0

  const collectedAmountDiff = collectedAmountAfter - collectedAmountBefore

  const uncollectedAmountBefore = paymentValues.collectedBefore
    ? 0
    : paymentValues.groupAmountBefore - paymentValues.privateAmountBefore

  const uncollectedAmountAfter = paymentValues.collectedAfter
    ? 0
    : paymentValues.groupAmountAfter - paymentValues.privateAmountAfter

  const uncollectedAmountDiff = uncollectedAmountAfter - uncollectedAmountBefore

  return {
    year: paymentValues.purchaseDate.toDate().getFullYear(),
    month: paymentValues.purchaseDate.toDate().getMonth() + 1,
    paidAmountDiff,
    collectedAmountDiff,
    uncollectedAmountDiff,
    user: paymentValues.user,
  }
}
