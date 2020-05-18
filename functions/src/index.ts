import * as functions from 'firebase-functions'

import * as admin from 'firebase-admin'
admin.initializeApp()
const db = admin.firestore()

export const onCreatePayment = functions
  .region('asia-northeast1')
  .firestore.document('groups/{groupID}/payments/{paymentID}')
  .onCreate(async (snapshot, { params }) => {
    const groupID = params.groupID

    const purchaseDate = (await snapshot.get(
      'purchaseDate'
    )) as admin.firestore.Timestamp

    const year = purchaseDate.toDate().getFullYear()
    const thisMonth = purchaseDate.toDate().getMonth() + 1
    const month = thisMonth < 10 ? '0' + thisMonth : thisMonth

    const yearMonth = `${year}${month}`

    const sumColRef = db
      .collection(`groups/${groupID}/monthly-summaries`)
      .where('yearMonth', '==', yearMonth)
    const sumSnapshots = await sumColRef.get()

    const userRef = snapshot.get('user.ref')

    const sumUserColRef = db
      .collection(`groups/${groupID}/monthly-user-summaries`)
      .where('user.ref', '==', userRef)
      .where('yearMonth', '==', yearMonth)
    const sumUserSnapshots = await sumUserColRef.get()

    const groupAmount = snapshot.get('groupAmount') as number
    const privateAmount = snapshot.get('privateAmount') as number
    const unpaidAmount = groupAmount - privateAmount

    if (sumSnapshots.size === 0) {
      await db.collection(`groups/${groupID}/monthly-summaries`).add({
        _createdAt: admin.firestore.FieldValue.serverTimestamp(),
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        groupAmount,
        unpaidAmount,
        yearMonth,
      })
    } else {
      const sumSnapshot = sumSnapshots.docs[0]
      await sumSnapshot.ref.update({
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        groupAmount: sumSnapshot.get('groupAmount') + groupAmount,
        unpaidAmount: sumSnapshot.get('unpaidAmount') + groupAmount,
      })
    }

    if (sumUserSnapshots.size === 0) {
      await db.collection(`groups/${groupID}/monthly-user-summaries`).add({
        _createdAt: admin.firestore.FieldValue.serverTimestamp(),
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        groupAmount,
        unpaidAmount,
        user: {
          ref: userRef,
        },
        yearMonth,
      })
    } else {
      const sumUserSnapshot = sumUserSnapshots.docs[0]
      await sumUserSnapshot.ref.update({
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        groupAmount: sumUserSnapshot.get('groupAmount') + groupAmount,
        unpaidAmount: sumUserSnapshot.get('unpaidAmount') + groupAmount,
      })
    }
  })
