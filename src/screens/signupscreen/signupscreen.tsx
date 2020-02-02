import { Container } from 'native-base';
import React from 'react';
import SignupForm from '../../components/signup-form/signup-form.component';

const SignupScreen = ({ navigation }) => {
  return (
    <Container>
      <SignupForm navigation={navigation} />
    </Container>
  );
};

SignupScreen.navigationOptions = () => ({
  title: '登録する'
});

export default SignupScreen;
