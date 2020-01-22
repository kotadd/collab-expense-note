import { Body, CardItem, Left, Text, Accordion } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import { paymentType } from '../../screens/types';
import PaymentListDaily from '../payment-list-daily/payment-list-daily.component';

export type IDispatchToProps = {
  setCurrentPayments: (account: {}) => void;
};

const PaymentListMonthly = props => {
  let resultDom = [
    <CardItem
      header
      bordered
      key='headerTop'
      style={{ backgroundColor: '#dce3ea' }}
    >
      <Left>
        <Text>該当月</Text>
      </Left>
      <Body>
        <Text>支出総額</Text>
      </Body>
    </CardItem>
  ];

  const { currentPayments, navigation } = props;
  // console.log(`props: ${JSON.stringify(props, null, '  ')}`);
  if (currentPayments) {
    let resultKey: string;
    let resultVal: string;
    let prevDom = <></>;
    let currentDom = <></>;
    let payment: paymentType;

    let prevYear: string;
    let prevMonth: string;
    let currentYear: string;
    let currentMonth: string;
    let currentDay: string;

    let currentDate: string;
    let amount = 0;

    // console.log(
    //   `currentPayments: ${JSON.stringify(currentPayments, null, '  ')}`
    // );

    const resultKeys = Object.keys(currentPayments);

    // console.log(`resultKeys: ${resultKeys}`);
    // console.log(`length: ${resultKeys.length}`);

    for (let i = 0; i < resultKeys.length; i++) {
      resultKey = resultKeys[i];

      // console.log(`resultKey: ${resultKey}`);

      let resultVals = currentPayments[resultKey];

      const paymentsMap = resultVals.reduce((accumulator, collection) => {
        currentDate = collection.date.replace(/(\d\d|\d)日/, '');
        amount = collection.groupAmount;
        accumulator[currentDate]
          ? (accumulator[currentDate] += amount)
          : (accumulator[currentDate] = amount);
        return accumulator;
      }, {});

      console.log(`paymentsMap: ${JSON.stringify(paymentsMap, null, '  ')}`);

      let amount: number;
      let date: Date;

      let monthlyKeys = Object.keys(paymentsMap);
      // console.log(`monthlyKeys: ${JSON.stringify(monthlyKeys, null, '  ')}`);

      for (let j = 0; j < monthlyKeys.length; j++) {
        resultVal = paymentsMap[monthlyKeys[j]];
        // console.log(`resultVal: ${JSON.stringify(resultVal, null, '  ')}`);
        console.log(`resultKey: ${resultKey}`);
        // currentDom = (
        //   <CardItem
        //     bordered
        //     button
        //     key={resultKey + j}
        //     onPress={() => {
        //       navigation.navigate('Daily', [resultKey]);
        //     }}
        //   >
        //     <Left>
        //       <Text>{resultKey}</Text>
        //     </Left>
        //     <Body>
        //       <Text>{resultVal.toLocaleString()} 円</Text>
        //     </Body>
        //   </CardItem>
        // );
        const dataArray = [
          { title: 'First Element', content: 'Lorem ipsum dolor sit amet' },
          { title: 'Second Element', content: 'Lorem ipsum dolor sit amet' },
          { title: 'Third Element', content: 'Lorem ipsum dolor sit amet' }
        ];

        currentDom = (
          <Accordion
            dataArray={dataArray}
            icon='add'
            expandedIcon='remove'
            iconStyle={{ color: 'green' }}
            expandedIconStyle={{ color: 'red' }}
          />
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
