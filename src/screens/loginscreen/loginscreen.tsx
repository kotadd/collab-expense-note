import { Container } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase/firebase.utils';
import LoginForm from '../../components/login-form/login-form.component';
import { setCurrentUser } from '../../redux/user/user.actions';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      dispatch(setCurrentUser(userAuth));
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

export default LoginScreen;
