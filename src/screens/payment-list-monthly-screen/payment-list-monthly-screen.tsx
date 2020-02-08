import { Container, Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  auth,
  fetchAllUserData,
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../firebase/firebase.utils';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';
import { setCurrentPayments } from '../../redux/account/account.actions';
import { setCurrentUser } from '../../redux/user/user.actions';
import { IDispatchToAccountProps, IStateToProps, Props } from '../types';
import { findGroupUsers } from '../utils';

const PaymentListMonthlyScreen = ({
  navigation,
  currentUser,
  isPaymentsUpdated
}: Props & IDispatchToAccountProps) => {
  const [userList, setUserList] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPaymentsData() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const payments = await fetchPaymentsByUser(userInfo);
      dispatch(setCurrentPayments(payments));
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
    function showToast() {
      if (currentUser) {
        Toast.show({
          text: 'ログインしました',
          type: 'success'
        });
      }
    }
    showToast();
  }, []);

  return (
    <Container>
      <PaymentListMonthly navigation={navigation} userList={userList} />
      {/* <NativeFooter /> */}
    </Container>
  );
};

const logOut = async navigation => {
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
    <Button title='ログアウト' onPress={() => logOut(navigation)} />
  )
});

const mapStateToProps = ({ user, account }: IStateToProps) => ({
  currentUser: user.currentUser,
  isPaymentsUpdated: account.isPaymentsUpdated
});

export default connect(mapStateToProps)(PaymentListMonthlyScreen);
