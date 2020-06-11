import { CardItem, Left, Text, Body } from 'native-base'
import React from 'react'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { PaymentProps } from '../../../repository/firebase/payments/payment-types'
import CollectionCheck from '../collection-check/collection-check.component'

type ContentProps = {
  navigation: RootScreenNavigationProp
  payment: PaymentProps
  year: number
  month: number
}

const PaymentListDailyContent: React.FC<ContentProps> = ({
  navigation,
  payment,
  year,
  month,
}: ContentProps) => {
  const date = timestampToLocaleDate(payment.get('purchaseDate'), 'ja-JP')
  const day = date.replace(/.*?月/, '').toString()

  const paymentID = payment.id
  const groupAmount = payment.get('groupAmount')
  const privateAmount = payment.get('privateAmount')
  const expense = groupAmount - privateAmount

  return (
    <CardItem
      bordered
      button
      key={paymentID}
      onPress={(): void => {
        navigation.navigate('HomeTabs', {
          screen: 'Home',
          params: {
            screen: 'Main',
            params: {
              screen: 'Detail',
              params: {
                yearMonth: `${year}年${month}月`,
                day,
                paymentID,
              },
            },
          },
        })
      }}
    >
      <Left>
        <Text>{day}</Text>
      </Left>
      <Body>
        <Text>{expense.toLocaleString()} 円</Text>
      </Body>
      <CollectionCheck collected={payment.get('collected') as boolean} />
    </CardItem>
  )
}
export default PaymentListDailyContent
