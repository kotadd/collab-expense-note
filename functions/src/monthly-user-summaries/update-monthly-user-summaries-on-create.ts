import * as admin from 'firebase-admin'
import { CreateSourcePaymentProps } from '../types'

export async function updateMonthlyUserSummaryOnCreatePayment(
  db: FirebaseFirestore.Firestore,
  {
    year,
    month,
    paidAmount,
    collectedAmount,
    uncollectedAmount,
    user,
  }: CreateSourcePaymentProps,
  groupID: string
) {
  if (!user) return

  const sumUserColRef = db
    .collection(`groups/${groupID}/monthly-user-summaries`)
    .where('user.ref', '==', user.ref)
    .where('year', '==', year)
    .where('month', '==', month)
  const sumUserSnapshots = await sumUserColRef.get()

  if (sumUserSnapshots.size === 0) {
    await db.collection(`groups/${groupID}/monthly-user-summaries`).add({
      _createdAt: admin.firestore.FieldValue.serverTimestamp(),
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isCollected: false,
      month,
      paidAmount: paidAmount,
      collectedAmount,
      uncollectedAmount,
      user: {
        id: user.ref.id,
        ref: user.ref,
      },
      year,
    })
  } else {
    const sumUserSnapshot = sumUserSnapshots.docs[0]
    await sumUserSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      paidAmount: sumUserSnapshot.get('paidAmount') + paidAmount,
      collectedAmount: sumUserSnapshot.get('collectedAmount') + collectedAmount,
      uncollectedAmount:
        sumUserSnapshot.get('uncollectedAmount') + uncollectedAmount,
    })
  }
}
