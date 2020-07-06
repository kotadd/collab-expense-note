import * as admin from 'firebase-admin'
import { UpdateSourcePaymentProps } from '../types'

export async function updateMonthlyUserSummaryOnUpdatePayment(
  db: FirebaseFirestore.Firestore,
  {
    year,
    month,
    paidAmountDiff,
    collectedAmountDiff,
    uncollectedAmountDiff,
    user,
  }: UpdateSourcePaymentProps,
  groupID: string
) {
  if (!user) return

  const sumUserColRef = db
    .collection(`groups/${groupID}/monthly-user-summaries`)
    .where('user.ref', '==', user.ref)
    .where('year', '==', year)
    .where('month', '==', month)
  const sumUserSnapshots = await sumUserColRef.get()

  const sumUserSnapshot = sumUserSnapshots.docs[0]
  await sumUserSnapshot.ref.update({
    _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    paidAmount: sumUserSnapshot.get('paidAmount') + paidAmountDiff,
    collectedAmount:
      sumUserSnapshot.get('collectedAmount') + collectedAmountDiff,
    uncollectedAmount:
      sumUserSnapshot.get('uncollectedAmount') + uncollectedAmountDiff,
  })
}
