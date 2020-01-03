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
import { fetchPaymentsData } from '../../../firebase/firebase.utils';
import { connect } from 'react-redux';
interface IStateToProps {
  user: {
    currentUser: {};
  };
  currentUser: {};
}

interface INavProps {
  navigation: NavigationStackProp;
}

type Props = IStateToProps & INavProps;

class PaymentListMonthly extends Component<Props> {
  constructor(props) {
    super(props);
    let resultDoms = [];
  }

  componentWillMount() {
    const payments = fetchPaymentsData(this.props.currentUser);
    let tempDom = [];

    console.log(payments);
  }

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
          <CardItem
            bordered
            button
            onPress={() => {
              this.props.navigation.navigate('Daily');
            }}
          >
            <Left>
              <Text>2020年01月</Text>
            </Left>
            <Body>
              <Text>¥127,721</Text>
            </Body>
            <Right>
              <Icon name='arrow-forward' />
            </Right>
          </CardItem>
          <CardItem
            bordered
            button
            onPress={() => {
              alert('2019年12月の支出額');
            }}
          >
            <Left>
              <Text>2019年12月</Text>
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

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(PaymentListMonthly);
