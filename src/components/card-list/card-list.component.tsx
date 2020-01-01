import {
  Card,
  CardItem,
  Content,
  Icon,
  Right,
  Text,
  Left,
  Body
} from 'native-base';
import React, { Component } from 'react';

class CardList extends Component {
  render() {
    return (
      <Content>
        <Card>
          <CardItem header bordered>
            <Left>
              <Text>該当月</Text>
            </Left>
            <Body>
              <Text>支出金額</Text>
            </Body>
            <Right />
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>2020/01</Text>
            </Left>
            <Body>
              <Text>¥127,721</Text>
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>
          <CardItem bordered>
            <Left>
              <Text>2019/12</Text>
            </Left>
            <Body>
              <Text>¥467,269</Text>
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

export default CardList;
