import * as admin from 'firebase-admin'
import { UpdateSourcePaymentProps } from '../types'

export async function updateMonthlySummaryOnUpdatePayment(
  db: FirebaseFirestore.Firestore,
  {
    year,
    month,
    paidAmountDiff,
    collectedAmountDiff,
    uncollectedAmountDiff,
  }: UpdateSourcePaymentProps,
  groupID: string
) {
  const sumColRef = db
    .collection(`groups/${groupID}/monthly-summaries`)
    .where('year', '==', year)
    .where('month', '==', month)
  const sumSnapshots = await sumColRef.get()

  const sumSnapshot = sumSnapshots.docs[0]
  await sumSnapshot.ref.update({
    _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    groupAmount: sumSnapshot.get('groupAmount') + paidAmountDiff,
    collectedGroupAmount:
      sumSnapshot.get('collectedGroupAmount') + collectedAmountDiff,
    uncollectedGroupAmount:
      sumSnapshot.get('uncollectedGroupAmount') + uncollectedAmountDiff,
  })
}
