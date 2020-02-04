import {
  Body,
  CardItem,
  Icon,
  Item,
  Left,
  Picker,
  Right,
  Text,
  Title,
  Header,
  Button
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

const PaymentListMonthly = ({ currentPayments, navigation, userList }) => {
  const [selectedUser, setSelectedUser] = useState('all-items');

  const onValueChange = async (user: string) => {
    setSelectedUser(user);
  };

  let pickerItems = [
    <Picker.Item label='全体' value='all-items' key='all-items' />
  ];

  for (let key in userList) {
    let pickerItem = (
      <Picker.Item label={userList[key]} value={key} key={key} />
    );
    pickerItems.push(pickerItem);
  }

  let resultDom = [
    <Item picker key='picker-item'>
      <Picker
        key='picker-dropdown'
        mode='dropdown'
        iosIcon={<Icon name='arrow-down' />}
        style={{ width: undefined }}
        placeholder='全体'
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor='#007aff'
        selectedValue={selectedUser}
        onValueChange={onValueChange.bind(this)}
        renderHeader={backAction => (
          <Header style={{ backgroundColor: '#f44242' }}>
            <Left>
              <Button transparent onPress={backAction}>
                <Icon name='arrow-back' style={{ color: '#fff' }} />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ color: '#fff' }}>同じグループのメンバー</Title>
            </Body>
            <Right />
          </Header>
        )}
      >
        {pickerItems}
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

  if (currentPayments) {
    let resultKey: string;
    let currentDom = <></>;

    let currentDate: string;
    let yearMonth: string;

    //   `currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`
    // );

    const resultKeys = Object.keys(currentPayments);

    resultKeys.sort((a, b) => {
      let leftVal = a.match(/\d+/g);
      let leftYear = parseInt(leftVal[0]);
      let leftMonth = parseInt(leftVal[1]);

      let rightVal = b.match(/\d+/g);
      let rightYear = parseInt(rightVal[0]);
      let rightMonth = parseInt(rightVal[1]);

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

      let resultVals = currentPayments[resultKey];

      const paymentsMap = resultVals.reduce(
        (accumulator, payment: paymentType) => {
          if (selectedUser === 'all-items' || selectedUser === payment.userID) {
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
          }

          return accumulator;
        },
        {}
      );

      let monthlyKeys = Object.keys(paymentsMap);

      for (let j = 0; j < monthlyKeys.length / 2; j++) {
        let totalAmount = paymentsMap[monthlyKeys[j]];
        let uncollectedAmount = paymentsMap[monthlyKeys[j + 1]];

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
