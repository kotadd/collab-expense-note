import { Container, Toast } from 'native-base';
import React, { Dispatch, useEffect, useState } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import {
  fetchPaymentsData,
  fetchAllGroupUserDataByUser
} from '../../../firebase/firebase.utils';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';
import { setCurrentPayments } from '../../redux/account/account.actions';
import { IDispatchToAccountProps, IStateToProps, Props } from '../types';

const PaymentListMonthlyScreen = ({
  currentUser,
  setCurrentPayments,
  navigation
}: Props & IDispatchToAccountProps) => {
  const [userList, setUserList] = useState({});
  useEffect(() => {
    async function fetchData() {
      const payments = await fetchPaymentsData(currentUser);
      setCurrentPayments(payments);
    }
    fetchData();
  });

  useEffect(() => {
    async function fetchData() {
      const users = await fetchAllGroupUserDataByUser(currentUser);

      setUserList(users);
    }
    fetchData();

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
)(PaymentListMonthlyScreen);
