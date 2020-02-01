import { Container } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login-form/login-form.component';
import { IStateToProps } from '../types';
import { auth } from '../../../firebase/firebase.utils';

const LoginScreen = ({ navigation, currentUser }) => {
  if (currentUser) {
    navigation.navigate('App');
  }

  return (
    <Container>
      <LoginForm navigation={navigation} />
    </Container>
  );
};

LoginScreen.navigationOptions = () => ({
  title: 'ログイン'
});

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(LoginScreen);
