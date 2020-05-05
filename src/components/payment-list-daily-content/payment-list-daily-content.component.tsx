import React from 'react'
import { CardItem, Left, Body, Right, Text } from 'native-base'
import CollectionCheck from '../collection-check/collection-check.component'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { MainStackParamList } from '../../../AppContainer'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { PaymentProps } from '../../../repository/firebase/payments/payment-types'

type ContentProps = {
  navigation: StackNavigationProp<MainStackParamList, 'Detail'>
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
