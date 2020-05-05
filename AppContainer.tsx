import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { Button, Icon, Text } from 'native-base'
import * as React from 'react'
import { ReactElement } from 'react'
import { enableScreens } from 'react-native-screens'
import HeaderLeftLogoutButton from './src/components/header/header-left-logout-button.component'
import HeaderRightCreateButton from './src/components/header/header-right-create-button.component'
import AddInfoScreen from './src/screens/add-info-screen/add-info.screen'
import CreateGroupScreen from './src/screens/create-group-screen/create-group.screen'
import CreateNewScreen from './src/screens/create-new-screen/create-new-screen'
import LoginScreen from './src/screens/loginscreen/loginscreen'
import PaymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen'
import PaymentListDetailScreen from './src/screens/payment-list-detail-screen/payment-list-detail-screen'
import PaymentListMonthlyScreen from './src/screens/payment-list-monthly-screen/payment-list-monthly-screen'
import SignupScreen from './src/screens/signupscreen/signupscreen'

export type MainStackParamList = {
  Monthly: undefined
  Daily: { yearMonth: string }
  Detail: { yearMonth: string; day: string; paymentID: string }
}

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
  AddInfo: undefined
}

export type GroupStackParamList = {
  Group: undefined
}

export type ModalStackParamList = {
  CreateNew: { from: 'monthly' | 'daily' }
  Edit: undefined
}

export type RootStackParamList = {
  Main: {
    screen?: 'Monthly' | 'Daily' | 'Detail'
    params?: {
      yearMonth?: string
      day?: string
      paymentID?: string
    }
  }
  Modal: {
    screen: 'CreateNew' | 'Edit'
    params: {
      from: 'monthly' | 'daily'
    }
  }
  Auth: { screen: 'Login' | 'Signup' | 'AddInfo' }
  Group: { screen: 'Group' }
}

export type MainScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Monthly'>,
  CompositeNavigationProp<
    StackNavigationProp<MainStackParamList, 'Daily'>,
    StackNavigationProp<MainStackParamList, 'Detail'>
  >
>

export type GroupScreenNavigationProp = StackNavigationProp<
  GroupStackParamList,
  'Group'
>

export type AuthScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, 'Login'>,
  CompositeNavigationProp<
    StackNavigationProp<AuthStackParamList, 'Signup'>,
    StackNavigationProp<AuthStackParamList, 'AddInfo'>
  >
>

export type ModalScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalStackParamList, 'CreateNew'>,
  StackNavigationProp<ModalStackParamList, 'Edit'>
>

export type RootScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Main'>,
  CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'Modal'>,
    CompositeNavigationProp<
      StackNavigationProp<RootStackParamList, 'Auth'>,
      StackNavigationProp<RootStackParamList, 'Group'>
    >
  >
>

const MainStack = createStackNavigator<MainStackParamList>()
const AuthStack = createStackNavigator<AuthStackParamList>()
const GroupStack = createStackNavigator<GroupStackParamList>()
const ModalStack = createStackNavigator<ModalStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

const MainStackScreen: React.FC = () => {
  const navigation = useNavigation<RootScreenNavigationProp>()

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Monthly"
        component={PaymentListMonthlyScreen}
        options={{
          headerTitle: '月ごとの支出',
          headerRight: (): ReactElement => {
            const rightButton = (
              <HeaderRightCreateButton navigation={navigation} from="monthly" />
            )
            return rightButton
          },
          headerLeft: (): ReactElement => {
            const leftButton = (
              <HeaderLeftLogoutButton navigation={navigation} />
            )
            return leftButton
          },
        }}
      />
      <MainStack.Screen
        name="Daily"
        component={PaymentListDailyScreen}
        options={{
          title: '日付ごとの支出',
          headerRight: (): ReactElement => {
            const rightButton = (
              <HeaderRightCreateButton navigation={navigation} from="daily" />
            )
            return rightButton
          },
        }}
      />
      <MainStack.Screen
        name="Detail"
        component={PaymentListDetailScreen}
        options={{
          headerBackTitle: '戻る',
          title: '支払いの詳細',
        }}
      />
    </MainStack.Navigator>
  )
}

const AuthStackScreen: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: 'ログイン' }}
    />
    <AuthStack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ title: '登録する' }}
    />
    <AuthStack.Screen
      name="AddInfo"
      component={AddInfoScreen}
      options={{ title: '情報の追加' }}
    />
  </AuthStack.Navigator>
)

const GroupStackScreen: React.FC = () => (
  <GroupStack.Navigator>
    <GroupStack.Screen
      name="Group"
      component={CreateGroupScreen}
      options={{ title: 'グループの作成' }}
    />
  </GroupStack.Navigator>
)

const ModalStackScreen: React.FC = () => {
  const navigation = useNavigation()
  return (
    <ModalStack.Navigator>
      <ModalStack.Screen
        name="CreateNew"
        component={CreateNewScreen}
        options={{
          headerTitle: '新規作成',
          headerLeft: (): ReactElement => {
            const leftButton = (
              <Button
                iconLeft
                transparent
                onPress={(): void => navigation.goBack()}
              >
                <Icon name="arrow-back" />
                <Text>戻る</Text>
              </Button>
            )
            return leftButton
          },
        }}
      />
      <ModalStack.Screen name="Edit" component={CreateNewScreen} />
    </ModalStack.Navigator>
  )
}

const RootStackScreen: React.FC = () => (
  <RootStack.Navigator mode="modal" initialRouteName="Auth" headerMode="none">
    <RootStack.Screen name="Auth" component={AuthStackScreen} />
    <RootStack.Screen name="Group" component={GroupStackScreen} />
    <RootStack.Screen name="Main" component={MainStackScreen} />
    <RootStack.Screen name="Modal" component={ModalStackScreen} />
  </RootStack.Navigator>
)

const AppContainer: React.FC = () => <RootStackScreen />

enableScreens()

export default AppContainer
