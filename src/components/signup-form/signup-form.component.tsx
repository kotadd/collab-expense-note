import { useNavigation } from '@react-navigation/native'
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
} from 'native-base'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AuthScreenNavigationProp } from '../../../AppContainer'
import { createNewUser } from './signup-form.utils'

const SignupForm: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [togglePassword, setTogglePassword] = useState(false)

  const dispatch = useDispatch()

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

      {togglePassword ? (
        <Item floatingLabel last>
          <Icon active name="lock" />
          <Label>パスワード</Label>
          <Input
            secureTextEntry={false}
            defaultValue=""
            onChangeText={(text): void => setConfirmPassword(text)}
            value={confirmPassword}
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
          <Label>パスワードの再確認</Label>
          <Input
            secureTextEntry={true}
            defaultValue=""
            onChangeText={(text): void => setConfirmPassword(text)}
            value={confirmPassword}
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
          createNewUser(email, password, confirmPassword, dispatch, navigation)
        }
      >
        <Text> 登録する </Text>
      </Button>
      <Button transparent onPress={(): void => navigation.navigate('Login')}>
        <Text>もう登録済みですか？</Text>
      </Button>
    </Form>
  )
}

export default SignupForm
