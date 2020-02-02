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
import {
  auth,
  createUserProfileDocument
} from '../../../firebase/firebase.utils';
import { setCurrentUser } from '../../redux/user/user.actions';

interface IDispatchToProps {
  setCurrentUser: (user: {}) => void;
}

const SignupForm = ({ navigation, setCurrentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateSignup = async (email, password, confirmPassword) => {
    if (password != confirmPassword) {
      return Toast.show({
        text: 'パスワードと確認用パスワードが一致していません',
        type: 'danger'
      });
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user);

      if (user) {
        setCurrentUser(user);
        navigation.navigate('AddInfo');
      } else {
        setCurrentUser(user);
        return Toast.show({
          text: '正しく登録できませんでした',
          type: 'danger'
        });
      }
    } catch (error) {
      console.error(error);
    }
    // console.log(`ユーザーは：${JSON.stringify(userAuth.user, null, '  ')}`);
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
        <Item floatingLabel last>
          <Icon active name='lock' />
          <Label>パスワードの再確認</Label>
          <Input
            secureTextEntry={true}
            defaultValue=''
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button
          block
          dark
          onPress={() => validateSignup(email, password, confirmPassword)}
        >
          <Text> 登録する </Text>
        </Button>
        <Button transparent onPress={() => navigation.navigate('Login')}>
          <Text>もう登録済みですか？</Text>
        </Button>
      </Form>
    </Content>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignupForm);
