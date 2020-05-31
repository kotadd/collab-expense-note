import { CardItem, Left, Text } from 'native-base'
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
      <Left>
        <Text style={{ marginTop: 4 }}>{payment.get('shopName')}</Text>
      </Left>
      <Left>
        <Text>{payment.get('groupAmount').toLocaleString()} 円</Text>
      </Left>
      <Left>
        <Text>{payment.get('privateAmount').toLocaleString()} 円</Text>
      </Left>
      <CollectionCheck collected={payment.get('collected') as boolean} />
    </CardItem>
  )
}
export default PaymentListDailyContent
