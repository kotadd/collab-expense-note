import React from 'react'

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
import { NavigationStackProp } from '@react-navigation/stack'

type Props = {
  navigation: NavigationStackProp
}

class PaymentDetail extends React.Component<Props> {
  render() {
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
          <CardItem
            bordered
            button
            onPress={() => {
              this.props.navigation.navigate('Details')
            }}
          >
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
            onPress={() => {
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
}

export default PaymentDetail
