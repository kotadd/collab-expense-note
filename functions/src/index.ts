import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { updateMonthlySummaryOnCreatePayment } from './monthly-summaries/update-monthly-summaries-on-create'
import { updateMonthlySummaryOnUpdatePayment } from './monthly-summaries/update-monthly-summaries-on-update'
import { updateMonthlyUserSummaryOnCreatePayment } from './monthly-user-summaries/update-monthly-user-summaries-on-create'
import { updateMonthlyUserSummaryOnUpdatePayment } from './monthly-user-summaries/update-monthly-user-summaries-on-update'
import {
  getCreatePaymentValues,
  getUpdatePaymentValues,
  useCreateSourcePayments,
  useUpdateSourcePayments,
} from './utils'

admin.initializeApp()
const db = admin.firestore()

export const onCreatePayment = functions
  .region('asia-northeast1')
  .firestore.document('groups/{groupID}/payments/{paymentID}')
  .onCreate(async (snapshot, { params }) => {
    const groupID = params.groupID as string
    const paymentValues = getCreatePaymentValues(snapshot)
    const sourcePayments = useCreateSourcePayments(paymentValues)

    await updateMonthlySummaryOnCreatePayment(db, sourcePayments, groupID)
    await updateMonthlyUserSummaryOnCreatePayment(db, sourcePayments, groupID)
  })

export const onUpdatePayment = functions
  .region('asia-northeast1')
  .firestore.document('groups/{groupID}/payments/{paymentID}')
  .onUpdate(async (snapshot, { params }) => {
    const groupID = params.groupID as string
    const paymentValues = getUpdatePaymentValues(snapshot)
    const sourcePayments = useUpdateSourcePayments(paymentValues)

    await updateMonthlySummaryOnUpdatePayment(db, sourcePayments, groupID)
    await updateMonthlyUserSummaryOnUpdatePayment(db, sourcePayments, groupID)
  })
