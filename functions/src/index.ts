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

    const collected = (await snapshot.get('collected')) as boolean

    const groupAmount = snapshot.get('groupAmount') as number
    const privateAmount = snapshot.get('privateAmount') as number
    const unpaidAmount = collected ? 0 : groupAmount - privateAmount

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
        unpaidAmount: sumSnapshot.get('unpaidAmount') + unpaidAmount,
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
        unpaidAmount: sumUserSnapshot.get('unpaidAmount') + unpaidAmount,
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
    const thisMonth = purchaseDate.toDate().getMonth() + 1
    const month = thisMonth < 10 ? '0' + thisMonth : thisMonth

    const yearMonth = `${year}${month}`

    const sumColRef = db
      .collection(`groups/${groupID}/monthly-summaries`)
      .where('yearMonth', '==', yearMonth)
    const sumSnapshots = await sumColRef.get()

    const userRef = snapshot.before.get('user.ref')

    const sumUserColRef = db
      .collection(`groups/${groupID}/monthly-user-summaries`)
      .where('user.ref', '==', userRef)
      .where('yearMonth', '==', yearMonth)
    const sumUserSnapshots = await sumUserColRef.get()

    const collectedBefore = (await snapshot.before.get('collected')) as boolean
    const collectedAfter = (await snapshot.after.get('collected')) as boolean

    const groupAmountBefore = snapshot.before.get('groupAmount') as number
    const groupAmountAfter = snapshot.after.get('groupAmount') as number
    const groupAmountDiff = groupAmountAfter - groupAmountBefore

    const privateAmountBefore = snapshot.before.get('privateAmount') as number
    const privateAmountAfter = snapshot.after.get('privateAmount') as number

    const unpaidAmountBefore = collectedBefore
      ? 0
      : groupAmountBefore - privateAmountBefore

    const unpaidAmountAfter = collectedAfter
      ? 0
      : groupAmountAfter - privateAmountAfter

    const unpaidAmountDiff = unpaidAmountAfter - unpaidAmountBefore

    const sumSnapshot = sumSnapshots.docs[0]
    await sumSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      groupAmount: sumSnapshot.get('groupAmount') + groupAmountDiff,
      unpaidAmount: sumSnapshot.get('unpaidAmount') + unpaidAmountDiff,
    })

    const sumUserSnapshot = sumUserSnapshots.docs[0]
    await sumUserSnapshot.ref.update({
      _updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      groupAmount: sumUserSnapshot.get('groupAmount') + groupAmountDiff,
      unpaidAmount: sumUserSnapshot.get('unpaidAmount') + unpaidAmountDiff,
    })
  })
