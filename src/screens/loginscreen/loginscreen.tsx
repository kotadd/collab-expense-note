import { Container } from 'native-base';
import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import LoginForm from '../../components/login-form/login-form.component';
import { IStateToProps, IDispatchToProps } from '../types';
import {
  auth,
  createUserProfileDocument,
  loginUserAutomatically
} from '../../../firebase/firebase.utils';
import { Action } from 'redux';
import { setCurrentUser } from '../../redux/user/user.actions';

const LoginScreen = ({ navigation, currentUser, setCurrentUser }) => {
  auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      setCurrentUser(userAuth);
      navigation.navigate('App');
    }
  });

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

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
