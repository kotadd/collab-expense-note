import { Body, CardItem, Left, Right, Text } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { paymentType } from '../../screens/types';

const PaymentListDaily = ({ currentPayments, navigation }) => {
  let resultDom = [
    <CardItem
      header
      bordered
      key='headerTop'
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
    </CardItem>
  ];

  // console.log(`date: ${navigation.state.params.date}`);

  if (currentPayments) {
    let resultKey: string;
    let currentDom = <></>;
    let payment: paymentType;

    let currentDay: string;

    // console.log(`currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`);

    const targetPayments = currentPayments[navigation.state.params.date];
    // console.log(targetPayments);
    for (let i = 0; i < targetPayments.length; i++) {
      payment = targetPayments[i];
      resultKey = `result-${i}`;

      currentDay = payment.date.replace(/.*月/, '');

      currentDom = (
        <CardItem
          bordered
          button
          key={resultKey}
          onPress={() => {
            // navigation.navigate('Details');
            alert('fetched from firestore');
          }}
        >
          <Left>
            <Text>{currentDay}</Text>
          </Left>
          <Body>
            <Text>{payment.shopName}</Text>
          </Body>
          <Right>
            <Text>¥{payment.groupAmount.toLocaleString()}</Text>
          </Right>
          <Right>
            <Text>¥{payment.userAmount.toLocaleString()}</Text>
          </Right>
        </CardItem>
      );

      resultDom.push(currentDom);
    }
  }
  // console.log(resultDom);
  return resultDom;
};

const mapStateToProps = ({ account }) => ({
  currentPayments: account.currentPayments
});

export default connect(mapStateToProps, null)(PaymentListDaily);
