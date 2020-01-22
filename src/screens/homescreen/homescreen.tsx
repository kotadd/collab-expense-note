import { Container, Toast } from 'native-base';
import React, { Dispatch, useEffect } from 'react';
import { Button } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { fetchPaymentsData } from '../../../firebase/firebase.utils';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';
import { setCurrentPayments } from '../../redux/account/account.actions';
import { IDispatchToAccountProps, IStateToProps, Props } from '../types';

const HomeScreen = ({
  currentUser,
  setCurrentPayments,
  navigation
}: Props & IDispatchToAccountProps) => {
  // console.log(`currentUser: ${JSON.stringify(currentUser)}`);

  useEffect(() => {
    async function fetchData() {
      const payments = await fetchPaymentsData(currentUser);
      setCurrentPayments(payments);
      // console.log(`paymentsData: ${JSON.stringify(payments, null, '  ')}`);
    }

    if (currentUser) {
      Toast.show({
        text: 'ログインしました',
        type: 'success'
      });
    }
    fetchData();
  }, []);

  return (
    <Container>
      <PaymentListMonthly navigation={navigation} />
      {/* <NativeFooter /> */}
    </Container>
  );
};

HomeScreen.navigationOptions = ({ navigation }) => ({
  title: '月ごとの支出',
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
