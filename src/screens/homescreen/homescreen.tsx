import { Container } from 'native-base';
import React from 'react';
import NativeFooter from '../../components/native-footer/native-footer.component';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <PaymentListMonthly navigation={navigation} />
      <NativeFooter />
    </Container>
  );
};

export default HomeScreen;
