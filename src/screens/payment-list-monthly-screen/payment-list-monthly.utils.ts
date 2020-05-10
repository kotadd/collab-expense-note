import { PaymentProps } from '../../../repository/firebase/payments/payment-types'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'

type AccumulatorType = {
  [key: string]: number
}

export function calcMonthlyTotalPayments(
  payments: PaymentProps[] | undefined
): AccumulatorType | [] {
  if (!payments) return []
  const paymentsMap = payments.reduce(
    (accumulator: AccumulatorType, payment: PaymentProps) => {
      const currentDate = timestampToLocaleDate(
        payment.get('purchaseDate'),
        'ja-JP'
      )
      const yearMonth = currentDate.replace(/(\d\d|\d)日.*/, '')

      const groupAmount = payment.get('groupAmount')
      let uncollectedAmount = 0
      if (!payment.get('collected')) {
        uncollectedAmount = groupAmount - payment.get('privateAmount')
      }

      const totalAmountKey = `${yearMonth}_total`
      const uncollectedAmountKey = `${yearMonth}_uncollected`
      accumulator[totalAmountKey]
        ? (accumulator[totalAmountKey] += groupAmount)
        : (accumulator[totalAmountKey] = groupAmount)

      accumulator[uncollectedAmountKey]
        ? (accumulator[uncollectedAmountKey] += uncollectedAmount)
        : (accumulator[uncollectedAmountKey] = uncollectedAmount)

      return accumulator
    },
    {}
  )
  return paymentsMap
}

export function isAllSelected(item: string): boolean {
  return item === 'all-items'
}
