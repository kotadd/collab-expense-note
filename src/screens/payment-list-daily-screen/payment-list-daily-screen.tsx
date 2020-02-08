import { Content } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import {
  fetchAllUserData,
  fetchGroupByUser,
  fetchPaymentsByUser,
  fetchUserByUserAuth
} from '../../../firebase/firebase.utils';
import PaymentListDaily from '../../components/payment-list-daily/payment-list-daily.component';
import { setCurrentPayments } from '../../redux/account/account.actions';
import { IStateToProps, Props } from '../types';
import { findGroupUsers } from '../utils';

const PaymentListDailyScreen = ({ currentUser, navigation }: Props) => {
  const [userList, setUserList] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const userInfo = await fetchUserByUserAuth(currentUser);
      const payments = await fetchPaymentsByUser(userInfo);

      dispatch(setCurrentPayments(payments));
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

export default connect(mapStateToProps)(PaymentListDailyScreen);
