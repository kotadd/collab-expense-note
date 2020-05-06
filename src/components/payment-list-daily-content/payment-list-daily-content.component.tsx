import { Body, CardItem, Left, Right, Text } from 'native-base'
import React from 'react'
import { MainScreenNavigationProp } from '../../../AppContainer'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { PaymentProps } from '../../../repository/firebase/payments/payment-types'
import CollectionCheck from '../collection-check/collection-check.component'

type ContentProps = {
  navigation: MainScreenNavigationProp
  payment: PaymentProps
  yearMonth: string
}

const PaymentListDailyContent: React.FC<ContentProps> = ({
  navigation,
  payment,
  yearMonth,
}: ContentProps) => {
  const date = timestampToLocaleDate(payment.get('purchaseDate'), 'ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  })
  const day = date.replace(/.*月/, '').toString()

  const paymentID = payment.id
  return (
    <CardItem
      bordered
      button
      key={paymentID}
      onPress={(): void => {
        navigation.navigate('Detail', {
          yearMonth,
          day,
          paymentID,
        })
      }}
    >
      <Left>
        <Text>{day}</Text>
      </Left>
      <Body>
        <Text style={{ marginTop: 4 }}>{payment.get('shopName')}</Text>
      </Body>
      <Right>
        <Text>¥{payment.get('groupAmount').toLocaleString()}</Text>
      </Right>
      <Right>
        <Text>¥{payment.get('privateAmount').toLocaleString()}</Text>
      </Right>
      <CollectionCheck collected={payment.get('collected') as boolean} />
    </CardItem>
  )
}
export default PaymentListDailyContent
