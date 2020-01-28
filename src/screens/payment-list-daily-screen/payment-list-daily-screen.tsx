import { Card, Content } from 'native-base';
import React, { useEffect, useState, Dispatch } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { fetchPaymentsData } from '../../../firebase/firebase.utils';
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component';
import { IStateToProps, Props, IDispatchToAccountProps } from '../types';
import { Action } from 'redux';
import { setCurrentPayments } from '../../redux/account/account.actions';

const PaymentListDailyScreen = ({ currentUser, navigation }: Props) => {
  // console.log(navigation.state.params);
  useEffect(() => {
    async function fetchData() {
      const payments = await fetchPaymentsData(currentUser);
      setCurrentPayments(payments);
    }
    fetchData();
  }, []);

  return (
    <Content>
      <PaymentListDaily navigation={navigation} />
      {/* <NativeFooter /> */}
    </Content>
  );
};

PaymentListDailyScreen.navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.date}の支出` || '日付ごとの支出',
  headerRight: () => (
    <Button title='＋' onPress={() => navigation.navigate('CreateNew')} />
  )
});

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): IDispatchToAccountProps => ({
  setCurrentPayments: payments => dispatch(setCurrentPayments(payments))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentListDailyScreen);
