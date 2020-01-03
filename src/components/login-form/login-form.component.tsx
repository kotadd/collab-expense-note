import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Item,
  Label,
  Text
} from 'native-base';
import React, { Component } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { loginUser } from '../../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';

type Props = {
  navigation: NavigationStackProp;
};

class LoginForm extends Component<Props> {
  render() {
    const validateLogin = async (email, password) => {
      const userAuth = await loginUser(email, password);

      if (!userAuth) {
        return console.log('nothing');
      }
      setCurrentUser(userAuth.user);
      this.props.navigation.navigate('Daily');
    };

    return (
      <Content>
        <Form>
          <Item floatingLabel>
            <Icon active name='mail' />
            <Label>Email</Label>
            <Input defaultValue='testdata@test.com' />
          </Item>
          <Item floatingLabel last>
            <Icon active name='lock' />
            <Label>Password</Label>
            <Input secureTextEntry={true} defaultValue='password' />
          </Item>
          <Grid>
            <Col style={{ height: 40 }}></Col>
          </Grid>
          <Button
            block
            dark
            onPress={() => validateLogin('testdata@test.com', 'password')}
          >
            <Text> ログイン </Text>
          </Button>
        </Form>
      </Content>
    );
  }
}

export default LoginForm;
