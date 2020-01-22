import { Body, CardItem, Left, Right, Text } from 'native-base';
import React from 'react';
import { paymentType } from '../../screens/types';
import { connect } from 'react-redux';

const PaymentListDaily = ({ currentPayments }) => {
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

  if (currentPayments) {
    let resultKey: string;
    let prevDom = <></>;
    let currentDom = <></>;
    let payment: paymentType;

    let prevYear: string;
    let prevMonth: string;
    let currentYear: string;
    let currentMonth: string;
    let currentDay: string;

    // console.log(`currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`);

    const targetPayments = currentPayments[Object.keys(currentPayments)[0]];
    for (let i = 0; i < targetPayments.length; i++) {
      payment = targetPayments[i];
      resultKey = `result-${i}`;

      currentYear = payment.date.replace(/年.*$/, '');
      currentMonth = payment.date.replace(/.*年/, '').replace(/月.*$/, '');
      currentDay = payment.date.replace(/.*月/, '');

      // if (prevYear !== currentYear || prevMonth !== currentMonth) {
      //   prevDom = (
      //     <CardItem
      //       bordered
      //       key='headerYear'
      //       style={{ backgroundColor: '#dce3ea' }}
      //     >
      //       <Left>
      //         <Text note={true}>
      //           {currentYear}年 {currentMonth}月
      //         </Text>
      //       </Left>
      //     </CardItem>
      //   );
      //   prevYear = currentYear;
      //   prevMonth = currentMonth;
      //   resultDom.push(prevDom);
      // }

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
