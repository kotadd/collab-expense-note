import { Card, Content, Toast } from 'native-base';
import React, { useEffect, useState, Dispatch } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import {
  fetchPaymentsByUser,
  fetchGroupByUser,
  fetchUserByUserAuth,
  fetchAllUserData
} from '../../../firebase/firebase.utils';
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component';
import { IStateToProps, Props, IDispatchToAccountProps } from '../types';
import { Action } from 'redux';
import { setCurrentPayments } from '../../redux/account/account.actions';
import { findGroupUsers } from '../utils';

const PaymentListDailyScreen = ({ currentUser, navigation }: Props) => {
  const [userList, setUserList] = useState({});

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const payments = await fetchPaymentsByUser(userInfo);

      setCurrentPayments(payments);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const group = await fetchGroupByUser(userInfo);
      const userIDs = group.userIDs;

      const users = await fetchAllUserData();
      const userList = findGroupUsers(userIDs, users);

      setUserList(userList);
    }
    fetchData();
  }, []);
  return (
    <Content>
      <PaymentListDaily navigation={navigation} userList={userList} />
      {/* <NativeFooter /> */}
    </Content>
  );
};

PaymentListDailyScreen.navigationOptions = ({ navigation }) => ({
  title: `${navigation.state.params.date}の支出` || '日付ごとの支出',
  headerRight: () => (
    <Button
      title='＋'
      onPress={() =>
        navigation.navigate('CreateNew', {
          from: 'daily'
        })
      }
    />
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
