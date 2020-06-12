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
    const month = purchaseDate.toDate().getMonth() + 1

    const sumColRef = db
      .collection(`groups/${groupID}/monthly-summaries`)
      .where('year', '==', year)
      .where('month', '==', month)
    const sumSnapshots = await sumColRef.get()

    const userRef = snapshot.get(
      'user.ref'
    ) as FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

    const sumUserColRef = db
      .collection(`groups/${groupID}/monthly-user-summaries`)
      .where('user.ref', '==', userRef)
      .where('year', '==', year)
      .where('month', '==', month)
    const sumUserSnapshots = await sumUserColRef.get()

    const isCollected = (await snapshot.get('collected')) as boolean

    const paidAmount = snapshot.get('groupAmount') as number
    const privateAmount = snapshot.get('privateAmount') as number
    const collectedAmount = isCollected ? paidAmount - privateAmount : 0
    const uncollectedAmount = isCollected ? 0 : paidAmount - collectedAmount

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

    if (sumUserSnapshots.size === 0) {
      const uid = userRef.id
      await db.collection(`groups/${groupID}/monthly-user-summaries`).add({
        _createdAt: admin.firestore.FieldValue.serverTimestamp(),
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        isCollected: false,
        month,
        paidAmount,
        collectedAmount,
        uncollectedAmount,
        user: {
          id: uid,
          ref: userRef,
        },
        year,
      })
    } else {
      const sumUserSnapshot = sumUserSnapshots.docs[0]
      await sumUserSnapshot.ref.update({
        _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        paidAmount: sumUserSnapshot.get('paidAmount') + paidAmount,
        collectedAmount:
          sumUserSnapshot.get('collectedAmount') + collectedAmount,
        uncollectedAmount:
          sumUserSnapshot.get('uncollectedAmount') + uncollectedAmount,
      })
    }
  })

export const onUpdatePayment = functions
  .region('asia-northeast1')
  .firestore.document('groups/{groupID}/payments/{paymentID}')
  .onUpdate(async (snapshot, { params }) => {
    const groupID = params.groupID

    const purchaseDate = (await snapshot.after.get(
      'purchaseDate'
    )) as admin.firestore.Timestamp

    const year = purchaseDate.toDate().getFullYear()
    const month = purchaseDate.toDate().getMonth() + 1

    const sumColRef = db
      .collection(`groups/${groupID}/monthly-summaries`)
      .where('year', '==', year)
      .where('month', '==', month)
    const sumSnapshots = await sumColRef.get()

    const userRef = snapshot.before.get('user.ref')

    const sumUserColRef = db
      .collection(`groups/${groupID}/monthly-user-summaries`)
      .where('user.ref', '==', userRef)
      .where('year', '==', year)
      .where('month', '==', month)
    const sumUserSnapshots = await sumUserColRef.get()

    const collectedBefore = (await snapshot.before.get('collected')) as boolean
    const collectedAfter = (await snapshot.after.get('collected')) as boolean

    const paidAmountBefore = snapshot.before.get('groupAmount') as number
    const paidAmountAfter = snapshot.after.get('groupAmount') as number
    const paidAmountDiff = paidAmountAfter - paidAmountBefore

    const privateAmountBefore = snapshot.before.get('privateAmount') as number
    const privateAmountAfter = snapshot.after.get('privateAmount') as number

    const collectedAmountBefore = collectedBefore
      ? paidAmountBefore - privateAmountBefore
      : 0

    const collectedAmountAfter = collectedAfter
      ? paidAmountAfter - privateAmountAfter
      : 0

    const collectedAmountDiff = collectedAmountAfter - collectedAmountBefore

    const uncollectedAmountBefore = collectedBefore
      ? 0
      : paidAmountBefore - collectedAmountBefore

    const uncollectedAmountAfter = collectedAfter
      ? 0
      : paidAmountAfter - collectedAmountAfter

    const uncollectedAmountDiff =
      uncollectedAmountAfter - uncollectedAmountBefore

    const sumSnapshot = sumSnapshots.docs[0]
    await sumSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      groupAmount: sumSnapshot.get('groupAmount') + paidAmountDiff,
      collectedGroupAmount:
        sumSnapshot.get('collectedGroupAmount') + collectedAmountDiff,
      uncollectedGroupAmount:
        sumSnapshot.get('uncollectedGroupAmount') + uncollectedAmountDiff,
    })

    const sumUserSnapshot = sumUserSnapshots.docs[0]
    await sumUserSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      collectedAmount:
        sumUserSnapshot.get('collectedAmount') + collectedAmountDiff,
      uncollectedAmount:
        sumUserSnapshot.get('uncollectedAmount') + uncollectedAmountDiff,
    })
  })
