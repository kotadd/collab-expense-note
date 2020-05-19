import React from 'react'
import { Left, Right, Body, CardItem, Text } from 'native-base'

const PaymentListDailyHeader: React.FC = () => (
  <CardItem
    header
    bordered
    key="headerTop"
    style={{ backgroundColor: '#dce3ea' }}
  >
    <Left>
      <Text>日付</Text>
    </Left>
    <Left>
      <Text>店舗</Text>
    </Left>
    <Left>
      <Text>家計費</Text>
    </Left>
    <Left>
      <Text>自分用</Text>
    </Left>
    <Right>
      <Text>精算済</Text>
    </Right>
  </CardItem>
)

export default PaymentListDailyHeader
