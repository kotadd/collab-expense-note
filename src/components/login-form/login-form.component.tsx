import {
  Button,
  Col,
  Form,
  Grid,
  Icon,
  Input,
  Item,
  Label,
  Text,
  Toast,
} from 'native-base'
import React, { useState, useEffect } from 'react'
import { Dispatch } from 'redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { auth } from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { navigateFromLoginScreen, validateLogin } from './login-form.utils'

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)

  const dispatch = useDispatch()
  const navigation = useNavigation<RootScreenNavigationProp>()

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) return
      dispatch(setCurrentUser(userAuth))
      navigateFromLoginScreen(userAuth, navigation)
    })
  }, [dispatch, navigation])

  return (
    <Form>
      <Item floatingLabel>
        <Icon active name="mail" />
        <Label>メールアドレス</Label>
        <Input
          defaultValue=""
          onChangeText={(text): void => setEmail(text)}
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
            onChangeText={(text): void => setPassword(text)}
            value={password}
          />
          <Icon
            type="FontAwesome"
            active
            name="eye"
            onPress={(): void => setTogglePassword(false)}
          />
        </Item>
      ) : (
        <Item floatingLabel last>
          <Icon active name="lock" />
          <Label>パスワード</Label>
          <Input
            secureTextEntry={true}
            defaultValue=""
            onChangeText={(text): void => setPassword(text)}
            value={password}
          />
          <Icon
            type="FontAwesome"
            active
            name="eye-slash"
            onPress={(): void => setTogglePassword(true)}
          />
        </Item>
      )}
      <Grid>
        <Col style={{ height: 40 }}></Col>
      </Grid>
      <Button
        block
        dark
        onPress={(): Promise<void | null> =>
          validateLogin(email, password, dispatch, navigation)
        }
      >
        <Text> ログイン </Text>
      </Button>

      <Button
        transparent
        onPress={(): void => navigation.navigate('Auth', { screen: 'Signup' })}
      >
        <Text>まだ登録していませんか？</Text>
      </Button>
    </Form>
  )
}

export default LoginForm
