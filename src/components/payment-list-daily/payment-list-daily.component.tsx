import {
  Body,
  Card,
  CardItem,
  Content,
  Icon,
  Left,
  Right,
  Text
} from 'native-base';
import { NavigationStackProp } from 'react-navigation-stack';

import React, { Component } from 'react';

type Props = {
  navigation: NavigationStackProp;
};

class PaymentListDaily extends Component<Props> {
  render() {
    return (
      <Content>
        <Card>
          <CardItem header bordered>
            <Left>
              <Text>日付</Text>
            </Left>
            <Body>
              <Text>ショップ</Text>
            </Body>
            <Right>
              <Text>金額</Text>
            </Right>
            <Right>
              <Text>家計費</Text>
            </Right>
          </CardItem>
          <CardItem
            bordered
            button
            onPress={() => {
              this.props.navigation.navigate('Details');
            }}
          >
            <Left>
              <Text>17日</Text>
            </Left>
            <Body>
              <Text>セブンイレブン</Text>
            </Body>
            <Right>
              <Text>¥821</Text>
            </Right>
            <Right>
              <Text>¥821</Text>
            </Right>
          </CardItem>
          <CardItem
            bordered
            button
            onPress={() => {
              this.props.navigation.navigate('Details');
            }}
          >
            <Left>
              <Text>15日</Text>
            </Left>
            <Body>
              <Text>スギ薬局</Text>
            </Body>
            <Right>
              <Text>¥5,221</Text>
            </Right>
            <Right>
              <Text>¥3,000</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

export default PaymentListDaily;
