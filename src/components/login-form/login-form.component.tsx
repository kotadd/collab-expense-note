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
} from 'native-base'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { validateLogin } from './login-form.utils'
import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native'
import {
  auth,
  fetchGroupIDByUID,
} from '../../../repository/firebase/firebase.utils'
import { setCurrentUser } from '../../redux/user/user.actions'
import {
  SignupScreenNavigationProp,
  MainScreenNavigationProp,
} from '../../../AppContainer'

type LoginOrSignupNavigationProp = CompositeNavigationProp<
  MainScreenNavigationProp,
  SignupScreenNavigationProp
>

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation<LoginOrSignupNavigationProp>()

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) return
      const groupID = await fetchGroupIDByUID(userAuth.uid)
      if (groupID) {
        dispatch(setCurrentUser(userAuth))
        navigation.navigate('Main')
      }
    })
  }, [dispatch, navigation])

  return (
    <Content>
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
          onPress={(): Promise<void> =>
            validateLogin(email, password, dispatch, navigation)
          }
        >
          <Text> ログイン </Text>
        </Button>

        <Button transparent onPress={(): void => navigation.navigate('Signup')}>
          <Text>まだ登録していませんか？</Text>
        </Button>
      </Form>
    </Content>
  )
}

export default LoginForm
