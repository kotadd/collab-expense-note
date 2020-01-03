import { Container } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import LoginForm from '../../components/login-form/login-form.component';

type Props = {
  navigation: NavigationStackProp;
};

class LoginScreen extends React.Component<Props> {
  static navigationOptions = () => {
    return {
      title: 'ログイン'
    };
  };

  render() {
    return (
      <Container>
        <LoginForm navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default LoginScreen;
