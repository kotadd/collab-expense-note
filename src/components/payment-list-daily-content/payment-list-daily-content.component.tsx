import { Body, CardItem, Left, Right, Text } from 'native-base'
import React from 'react'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { PaymentProps } from '../../../repository/firebase/payments/payment-types'
import CollectionCheck from '../collection-check/collection-check.component'

type ContentProps = {
  navigation: RootScreenNavigationProp
  payment: PaymentProps
  yearMonth: string
}

const PaymentListDailyContent: React.FC<ContentProps> = ({
  navigation,
  payment,
  yearMonth,
}: ContentProps) => {
  const date = timestampToLocaleDate(payment.get('purchaseDate'), 'ja-JP')
  const day = date.replace(/.*?月/, '').toString()

  const paymentID = payment.id
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
                yearMonth,
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
