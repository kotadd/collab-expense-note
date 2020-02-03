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
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { loginUser } from '../../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';

interface IDispatchToProps {
  setCurrentUser: (user: {}) => void;
}

const LoginForm = ({ navigation, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = async (email, password) => {
    const userAuth = await loginUser(email, password);
    
    if (userAuth) {
      setCurrentUser(userAuth.user);
      navigation.navigate('App');
    } else {
      setCurrentUser(userAuth);
      return Toast.show({
        text: 'ログイン情報が正しくありません',
        type: 'danger'
      });
    }
  };

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon active name='mail' />
          <Label>メールアドレス</Label>
          <Input
            defaultValue=''
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </Item>
        <Item floatingLabel last>
          <Icon active name='lock' />
          <Label>パスワード</Label>
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

        <Button transparent onPress={() => navigation.navigate('Signup')}>
          <Text>まだ登録していませんか？</Text>
        </Button>
      </Form>
    </Content>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(LoginForm);
