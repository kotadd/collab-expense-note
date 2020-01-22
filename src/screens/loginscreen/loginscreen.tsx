import { Container } from 'native-base';
import React from 'react';
import LoginForm from '../../components/login-form/login-form.component';
import { INavProps } from '../types';

const LoginScreen = ({ navigation }: INavProps) => {
  return (
    <Container>
      <LoginForm navigation={navigation} />
    </Container>
  );
};

LoginScreen.navigationOptions = () => ({
  title: 'ログイン'
});

export default LoginScreen;
