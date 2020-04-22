import { useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import * as React from 'react'
import HeaderLeftButton from './src/components/header/header-left-button.component'
import HeaderRightButton from './src/components/header/header-right-button.component'
import AddInfoScreen from './src/screens/add-info-screen/add-info.screen'
import CreateGroupScreen from './src/screens/create-group-screen/create-group.screen'
import LoginScreen from './src/screens/loginscreen/loginscreen'
import ModalScreen from './src/screens/modalscreen/modalscreen'
import PaymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen'
import PaymentListDetailScreen from './src/screens/payment-list-detail-screen/payment-list-detail-screen'
import PaymentListMonthlyScreen from './src/screens/payment-list-monthly-screen/payment-list-monthly-screen'
import SignupScreen from './src/screens/signupscreen/signupscreen'
import { ReactElement } from 'react'
import { PaymentType } from './repository/firebase/accounts/account-types'

export type MainStackParamList = {
  Home: undefined
  Daily: { yearMonth: string }
  Detail: { yearMonth: string; day: string; monthlyPayments: [PaymentType] }
}

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
  AddInfo: undefined
}

export type GroupStackParamList = {
  Group: undefined
}

export type RootStackParamList = {
  Main: { date: Date }
  CreateNew: { from: 'monthly' | 'daily' }
  Auth: undefined
  Group: undefined
}

export type HomeScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Home'
>

export type DailyScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Daily'
>

export type DetailScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Detail'
>

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>

export type SignupScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Signup'
>

export type AddInfoScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'AddInfo'
>

export type GroupScreenNavigationProp = StackNavigationProp<
  GroupStackParamList,
  'Group'
>

export type MainScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>

export type CreateNewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateNew'
>

export type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>

const MainStack = createStackNavigator<MainStackParamList>()
const AuthStack = createStackNavigator<AuthStackParamList>()
const GroupStack = createStackNavigator<GroupStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

const MainStackScreen: React.FC = () => {
  const createNewNavigation = useNavigation<CreateNewScreenNavigationProp>()
  const authNavigation = useNavigation<AuthScreenNavigationProp>()

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={PaymentListMonthlyScreen}
        options={{
          headerBackTitle: '戻る',
          headerTitle: '月ごとの支出',
          headerRight: (): ReactElement => {
            const rightButton = (
              <HeaderRightButton navigation={createNewNavigation} />
            )
            return rightButton
          },
          headerLeft: (): ReactElement => {
            const leftButton = <HeaderLeftButton navigation={authNavigation} />
            return leftButton
          },
        }}
      />
      <MainStack.Screen
        name="Daily"
        component={PaymentListDailyScreen}
        options={{
          headerBackTitle: '戻る',
          title: '日付ごとの支出',
          headerRight: (): ReactElement => {
            const rightButton = (
              <HeaderRightButton navigation={createNewNavigation} />
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
          headerRight: (): ReactElement => {
            const rightButton = (
              <HeaderRightButton navigation={createNewNavigation} />
            )
            return rightButton
          },
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

const RootStackScreen: React.FC = () => (
  <RootStack.Navigator mode="modal" initialRouteName="Auth" headerMode="none">
    <RootStack.Screen name="Auth" component={AuthStackScreen} />
    <RootStack.Screen name="CreateNew" component={ModalScreen} />
    <RootStack.Screen name="Group" component={GroupStackScreen} />
    <RootStack.Screen name="Main" component={MainStackScreen} />
  </RootStack.Navigator>
)

const AppContainer: React.FC = () => <RootStackScreen />
export default AppContainer
