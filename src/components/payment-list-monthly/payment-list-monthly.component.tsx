import {
  Body,
  CardItem,
  Icon,
  Item,
  Left,
  Picker,
  Right,
  Text
} from 'native-base';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { paymentType } from '../../screens/types';

export type IDispatchToProps = {
  setCurrentPayments: (account: {}) => void;
};

let dateOption = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weeday: 'long'
};

const PaymentListMonthly = ({ currentPayments, navigation }) => {
  // console.log('called PaymentListMonthly');
  const [selectedUser, setSelectedUser] = useState('');

  const onValueChange = (user: string) => {
    setSelectedUser(user);
  };

  let resultDom = [
    <Item picker>
      <Picker
        mode='dropdown'
        iosIcon={<Icon name='arrow-down' />}
        style={{ width: undefined }}
        placeholder='全体'
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor='#007aff'
        selectedValue={selectedUser}
        onValueChange={onValueChange.bind(this)}
      >
        <Picker.Item label='あなた' value='key0' />
        <Picker.Item label='ゆうや' value='key1' />
        <Picker.Item label='母' value='key1' />
      </Picker>
    </Item>,
    <CardItem
      header
      bordered
      key='headerTop'
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
  ];

  // const { currentPayments, navigation } = props;
  // console.log(`props: ${JSON.stringify(props, null, '  ')}`);
  if (currentPayments) {
    let resultKey: string;
    let currentDom = <></>;

    let currentDate: string;
    let yearMonth: string;

    // console.log(
    //   `currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`
    // );

    const resultKeys = Object.keys(currentPayments);

    // console.log(`resultKeys: ${resultKeys}`);
    // console.log(`length: ${resultKeys.length}`);

    resultKeys.sort((a, b) => {
      let leftVal = a.match(/\d+/g);
      let leftYear = parseInt(leftVal[0]);
      let leftMonth = parseInt(leftVal[1]);

      let rightVal = b.match(/\d+/g);
      let rightYear = parseInt(rightVal[0]);
      let rightMonth = parseInt(rightVal[1]);

      // console.log(`a: ${a.match(/\d+/g)}`);
      // console.log(`b: ${b.match(/\d+/g)}`);

      if (
        leftYear < rightYear ||
        (leftYear == rightYear && leftMonth < rightMonth)
      ) {
        return 1;
      }
      if (
        leftYear > rightYear ||
        (leftYear == rightYear && leftMonth > rightMonth)
      ) {
        return -1;
      }
      return 0;
    });

    for (let i = 0; i < resultKeys.length; i++) {
      resultKey = resultKeys[i];

      // console.log(`resultKey: ${resultKey}`);

      let resultVals = currentPayments[resultKey];

      const paymentsMap = resultVals.reduce(
        (accumulator, payment: paymentType) => {
          currentDate = payment.date
            .toDate()
            .toLocaleDateString('ja-JP', dateOption);

          yearMonth = currentDate.replace(/(\d\d|\d)日/, '');

          let totalAmountKey = `${yearMonth}_total`;
          let uncollectedAmountKey = `${yearMonth}_uncollected`;

          let groupAmount = payment.groupAmount;
          let uncollectedAmount = 0;
          if (!payment.collected) {
            uncollectedAmount = groupAmount - payment.userAmount;
          }

          accumulator[totalAmountKey]
            ? (accumulator[totalAmountKey] += groupAmount)
            : (accumulator[totalAmountKey] = groupAmount);

          accumulator[uncollectedAmountKey]
            ? (accumulator[uncollectedAmountKey] += uncollectedAmount)
            : (accumulator[uncollectedAmountKey] = uncollectedAmount);

          return accumulator;
        },
        {}
      );

      // console.log(`paymentsMap: ${JSON.stringify(paymentsMap, null, '  ')}`);

      let monthlyKeys = Object.keys(paymentsMap);
      // console.log(`monthlyKeys: ${JSON.stringify(monthlyKeys, null, '  ')}`);

      for (let j = 0; j < monthlyKeys.length / 2; j++) {
        let totalAmount = paymentsMap[monthlyKeys[j]];
        let uncollectedAmount = paymentsMap[monthlyKeys[j + 1]];

        // console.log(`totalAmount: ${JSON.stringify(totalAmount, null, '  ')}`);
        // console.log(`resultKey: ${resultKey}`);
        const yearMonth = resultKey;
        currentDom = (
          <CardItem
            bordered
            button
            key={resultKey + j}
            onPress={() => {
              navigation.navigate('Daily', {
                date: yearMonth
              });
            }}
          >
            <Left>
              <Text>{resultKey}</Text>
            </Left>
            <Body>
              <Text>{totalAmount.toLocaleString()} 円</Text>
            </Body>
            <Right>
              <Text>{uncollectedAmount.toLocaleString()} 円</Text>
            </Right>
          </CardItem>
        );
        resultDom.push(currentDom);
      }
    }
  }
  return resultDom;
};

const mapStateToProps = ({ account }) => ({
  currentPayments: account.currentPayments
});

export default connect(mapStateToProps, null)(PaymentListMonthly);
