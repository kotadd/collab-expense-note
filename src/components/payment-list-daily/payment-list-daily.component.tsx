import { Body, CardItem, Left, Right, Text, CheckBox, Icon } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { paymentType } from '../../screens/types';

let dateOption = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weeday: 'long'
};

const PaymentListDaily = ({ currentPayments, navigation }) => {
  // console.log('called PaymentListDaily');

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
      <Right>
        <Text>徴収済</Text>
      </Right>
    </CardItem>
  ];

  // console.log(`date: ${navigation.state.params.date}`);

  if (currentPayments) {
    let resultKey: string;
    let currentDom = <></>;
    let payment: paymentType;

    let currentDate: string;
    let currentDay: string;

    // console.log(`currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`);

    const targetPayments = currentPayments[navigation.state.params.date];

    if (targetPayments) {
      for (let i = 0; i < targetPayments.length; i++) {
        payment = targetPayments[i];
        resultKey = `result-${i}`;

        currentDate = payment.date
          .toDate()
          .toLocaleDateString('ja-JP', dateOption);

        currentDay = currentDate.replace(/.*月/, '');

        // console.log(`currentDay: ${currentDay}`);

        const collectCheckDom = payment.collected ? (
          <Right>
            <Icon
              type='FontAwesome'
              name='check'
              style={{ color: 'green', marginRight: 8 }}
            />
          </Right>
        ) : (
          <Right>
            <Icon type='FontAwesome' name='minus' style={{ marginRight: 10 }} />
          </Right>
        );

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
              <Text>{currentDay.toString()}</Text>
            </Left>
            <Body>
              <Text style={{ marginTop: 4 }}>{payment.shopName}</Text>
            </Body>
            <Right>
              <Text>¥{payment.groupAmount.toLocaleString()}</Text>
            </Right>
            <Right>
              <Text>¥{payment.userAmount.toLocaleString()}</Text>
            </Right>
            {collectCheckDom}
          </CardItem>
        );

        resultDom.push(currentDom);
      }
    }
  }
  // console.log(resultDom);
  return resultDom;
};

const mapStateToProps = ({ account }) => ({
  currentPayments: account.currentPayments
});

export default connect(mapStateToProps, null)(PaymentListDaily);
