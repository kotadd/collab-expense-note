import {
  Body,
  Card,
  CardItem,
  Content,
  Icon,
  Left,
  Right,
  Text
} from 'native-base'
import React from 'react'

const PaymentDetail: React.FC = () => {
  return (
    <Content>
      <Card>
        <CardItem header bordered>
          <Left>
            <Text>日付</Text>
          </Left>
          <Body>
            <Text>支出金額</Text>
          </Body>
          <Right />
        </CardItem>
        <CardItem bordered button onPress={(): void => console.log('clicked')}>
          <Left>
            <Text>2020年1月</Text>
          </Left>
          <Body>
            <Text>¥127,721</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem
          bordered
          button
          onPress={(): void => {
            alert('2019年12月の支出額')
          }}
        >
          <Left>
            <Text>2019年12月</Text>
          </Left>
          <Body>
            <Text>¥467,269</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
    </Content>
  )
}

export default PaymentDetail
