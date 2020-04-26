import React from 'react'
import { Left, Right, Body, CardItem, Text } from 'native-base'

const PaymentListDailyHeader = () => (
  <CardItem
    header
    bordered
    key="headerTop"
    style={{ backgroundColor: '#dce3ea' }}
  >
    <Left>
      <Text>日付</Text>
    </Left>
    <Body>
      <Text>ショップ</Text>
    </Body>
    <Right>
      <Text>家計費</Text>
    </Right>
    <Right>
      <Text>自分用</Text>
    </Right>
    <Right>
      <Text>精算済</Text>
    </Right>
  </CardItem>
)

export default PaymentListDailyHeader
