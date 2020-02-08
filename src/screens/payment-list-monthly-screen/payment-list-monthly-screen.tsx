import { Container, Toast } from 'native-base';
import React, { Dispatch, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  fetchAllUserData,
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth,
  auth
} from '../../../firebase/firebase.utils';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';
import {
  setCurrentPayments,
  updateIsPaymentsUpdated
} from '../../redux/account/account.actions';
import { IDispatchToAccountProps, IStateToProps, Props } from '../types';
import { findGroupUsers } from '../utils';
import { setCurrentUser } from '../../redux/user/user.actions';

const PaymentListMonthlyScreen = ({
  currentUser,
  isPaymentsUpdated,
  setCurrentPayments,
  navigation
}: Props & IDispatchToAccountProps) => {
  const [userList, setUserList] = useState({});
  useEffect(() => {
    async function fetchPaymentsData() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const payments = await fetchPaymentsByUser(userInfo);
      setCurrentPayments(payments);
    }
    fetchPaymentsData();
  }, [isPaymentsUpdated]);

  useEffect(() => {
    async function fetchGroupUserList() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const group = await fetchGroupByUser(userInfo);
      const userIDs = group.userIDs;

      const users = await fetchAllUserData();
      const userList = findGroupUsers(userIDs, users);
      setUserList(userList);
    }

    fetchGroupUserList();
  }, []);

  useEffect(() => {
    if (currentUser) {
      Toast.show({
        text: 'ログインしました',
        type: 'success'
      });
    }
  }, []);

  return (
    <Container>
      <PaymentListMonthly navigation={navigation} userList={userList} />
      {/* <NativeFooter /> */}
    </Container>
  );
};

const signOut = async navigation => {
  try {
    await auth.signOut();
    setCurrentUser(null);
    navigation.navigate('Auth');
    Toast.show({
      text: 'ログアウトしました',
      type: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

PaymentListMonthlyScreen.navigationOptions = ({ navigation }) => ({
  title: '月ごとの支出',
  headerRight: () => (
    <Button
      title='＋'
      onPress={() =>
        navigation.navigate('CreateNew', {
          from: 'monthly'
        })
      }
    />
  ),
  headerLeft: () => (
    <Button title='logout' onPress={() => signOut(navigation)} />
  )
});

const mapStateToProps = ({ user, account }: IStateToProps) => ({
  currentUser: user.currentUser,
  currentPayments: account.currentPayments,
  isPaymentsUpdated: account.isPaymentsUpdated
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action>
): IDispatchToAccountProps => ({
  setCurrentPayments: payments => dispatch(setCurrentPayments(payments)),
  updateIsPaymentsUpdated: () => dispatch(updateIsPaymentsUpdated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentListMonthlyScreen);
