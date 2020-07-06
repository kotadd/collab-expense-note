import * as admin from 'firebase-admin'
import { CreateSourcePaymentProps } from '../types'

export async function updateMonthlySummaryOnCreatePayment(
  db: FirebaseFirestore.Firestore,
  {
    year,
    month,
    paidAmount,
    collectedAmount,
    uncollectedAmount,
  }: CreateSourcePaymentProps,
  groupID: string
) {
  const sumColRef = db
    .collection(`groups/${groupID}/monthly-summaries`)
    .where('year', '==', year)
    .where('month', '==', month)

  const sumSnapshots = await sumColRef.get()

  if (sumSnapshots.size === 0) {
    await db.collection(`groups/${groupID}/monthly-summaries`).add({
      _createdAt: admin.firestore.FieldValue.serverTimestamp(),
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      collectedGroupAmount: collectedAmount,
      groupAmount: paidAmount,
      isCollected: false,
      month,
      uncollectedGroupAmount: uncollectedAmount,
      year,
    })
  } else {
    const sumSnapshot = sumSnapshots.docs[0]
    await sumSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      groupAmount: sumSnapshot.get('groupAmount') + paidAmount,
      collectedGroupAmount:
        sumSnapshot.get('collectedGroupAmount') + collectedAmount,
      uncollectedGroupAmount:
        sumSnapshot.get('uncollectedGroupAmount') + uncollectedAmount,
    })
  }
}
