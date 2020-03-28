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
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import { useNavigation } from '@react-navigation/native'

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)
  const dispatch = useDispatch()

  const validateLogin = async (email: string, password: string) => {
    const userAuth = await loginUser(email, password)
    if (userAuth && userAuth.user) {
      dispatch(setCurrentUser(userAuth.user))
      navigation.navigate('Main')
    } else {
      dispatch(setCurrentUser({}))
      return Toast.show({
        text: 'ログイン情報が正しくありません',
        type: 'danger'
      })
    }
  }

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon active name="mail" />
          <Label>メールアドレス</Label>
          <Input
            defaultValue=""
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </Item>
        {togglePassword ? (
          <Item floatingLabel last>
            <Icon active name="lock" />
            <Label>パスワード</Label>
            <Input
              secureTextEntry={false}
              defaultValue=""
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <Icon
              type="FontAwesome"
              active
              name="eye"
              onPress={() => setTogglePassword(false)}
            />
          </Item>
        ) : (
          <Item floatingLabel last>
            <Icon active name="lock" />
            <Label>パスワード</Label>
            <Input
              secureTextEntry={true}
              defaultValue=""
              onChangeText={text => setPassword(text)}
              value={password}
            />
            <Icon
              type="FontAwesome"
              active
              name="eye-slash"
              onPress={() => setTogglePassword(true)}
            />
          </Item>
        )}
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button block dark onPress={() => validateLogin(email, password)}>
          <Text> ログイン </Text>
        </Button>

        <Button transparent onPress={() => navigate('Signup')}>
          <Text>まだ登録していませんか？</Text>
        </Button>
      </Form>
    </Content>
  )
}

export default LoginForm
