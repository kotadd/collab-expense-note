import {
  Button,
  Col,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Toast
} from 'native-base';
import React, { useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { loginUser } from '../../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';

type INavProps = {
  navigation: NavigationStackProp;
};

interface IDispatchToProps {
  setCurrentUser: (user: {}) => void;
}

const LoginForm = ({ navigation }: INavProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = async (email, password) => {
    const userAuth = await loginUser(email, password);

    if (!userAuth) {
      return Toast.show({
        text: 'ログイン情報が正しくありません',
        type: 'danger'
      });
    }
    await setCurrentUser(userAuth.user);
    // console.log(`userAuth.user: ${userAuth.user}`);
    navigation.navigate('Home');
  };

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon active name='mail' />
          <Label>Email</Label>
          <Input
            defaultValue=''
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </Item>
        <Item floatingLabel last>
          <Icon active name='lock' />
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            defaultValue=''
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button block dark onPress={() => validateLogin(email, password)}>
          <Text> ログイン </Text>
        </Button>
      </Form>
    </Content>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(LoginForm);
