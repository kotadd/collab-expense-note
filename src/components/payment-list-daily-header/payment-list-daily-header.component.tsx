import { CardItem, Left, Right, Text, Body } from 'native-base'
import React from 'react'

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
    <Body>
      <Text>家計費（支出額）</Text>
    </Body>
    <Right>
      <Text>精算済</Text>
    </Right>
  </CardItem>
)

export default PaymentListDailyHeader
