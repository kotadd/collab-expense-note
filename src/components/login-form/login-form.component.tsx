import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
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
import React, { useState, ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { validateLogin } from './login-form.utils'

const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<RootScreenNavigationProp>()
  const [togglePassword, setTogglePassword] = useState(false)

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={({ email, password }): Promise<void> =>
        validateLogin(email, password, dispatch, navigation)
      }
    >
      {({ handleChange, handleBlur, handleSubmit, values }): ReactElement => (
        <Form>
          <Item floatingLabel>
            <Icon active name="mail" />
            <Label>メールアドレス</Label>
            <Input
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </Item>
          {togglePassword ? (
            <Item floatingLabel last>
              <Icon active name="lock" />
              <Label>パスワード</Label>
              <Input
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={false}
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
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
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

          <Button block dark onPress={handleSubmit}>
            <Text> ログイン </Text>
          </Button>
          <Button
            transparent
            onPress={(): void =>
              navigation.navigate('Auth', { screen: 'Signup' })
            }
          >
            <Text>まだ登録していませんか？</Text>
          </Button>
        </Form>
      )}
    </Formik>
  )
}

//   )
// }

export default LoginForm
