import React from 'react'
import { CardItem, Left, Right, Text, Body } from 'native-base'

const PaymentListMonthlyHeader: React.FC = () => (
  <CardItem
    header
    bordered
    key="headerTop"
    style={{ backgroundColor: '#dce3ea' }}
  >
    <Left>
      <Text>該当年月</Text>
    </Left>
    <Body>
      <Text>支出総額</Text>
    </Body>
    <Right>
      <Text>未精算額</Text>
    </Right>
  </CardItem>
)

export default PaymentListMonthlyHeader
