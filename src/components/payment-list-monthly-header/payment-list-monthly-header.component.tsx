import { CardItem, Left, Text } from 'native-base'
import React from 'react'

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
    <Left>
      <Text>支出総額</Text>
    </Left>
    <Left>
      <Text>未精算額</Text>
    </Left>
  </CardItem>
)

export default PaymentListMonthlyHeader
