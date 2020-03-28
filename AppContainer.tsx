import { useNavigation, RouteProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'
import * as React from 'react'
import HeaderLeftButton from './src/components/header/header-left-button.component'
import HeaderRightButton from './src/components/header/header-right-button.component'
import AddInfoScreen from './src/screens/add-info-screen/add-info.screen'
import CreateGroupScreen from './src/screens/create-group-screen/create-group.screen'
import LoginScreen from './src/screens/loginscreen/loginscreen'
import ModalScreen from './src/screens/modalscreen/modalscreen'
import paymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen'
import PaymentListMonthlyScreen from './src/screens/payment-list-monthly-screen/payment-list-monthly-screen'
import SignupScreen from './src/screens/signupscreen/signupscreen'

type MainStackParamList = {
  Home: undefined
  Daily: { date: string }
  Detail: undefined
}

type AuthStackParamList = {
  Login: undefined
  AddInfo: undefined
  Signup: undefined
}

type GroupStackParamList = {
  Group: undefined
}

type RootStackParamList = {
  Main: { date: Date }
  CreateNew: { from: 'monthly' | 'daily' }
  Auth: undefined
  Group: undefined
}

type CreateNewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateNew'
>

export type CreateNewProps = {
  navigation: CreateNewScreenNavigationProp
}

export type AuthScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Auth'
>

export type AuthProps = {
  navigation: AuthScreenNavigationProp
}

export type DailyScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Daily'
>

export type DailyScreenRouteProp = RouteProp<MainStackParamList, 'Daily'>

export type DailyProps = {
  navigation: DailyScreenNavigationProp
  route: DailyScreenRouteProp
}

export type DetailScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  'Detail'
>

const MainStack = createStackNavigator<MainStackParamList>()
const AuthStack = createStackNavigator<AuthStackParamList>()
const GroupStack = createStackNavigator<GroupStackParamList>()
const RootStack = createStackNavigator()

const MainStackScreen: React.FC = () => {
  const createNewNavigation = useNavigation<CreateNewScreenNavigationProp>()
  const authNavigation = useNavigation<AuthScreenNavigationProp>()
  // const dailyNavigation = useNavigation<DailyScreenNavigationProp>()

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={PaymentListMonthlyScreen}
        options={{
          headerBackTitle: '戻る',
          title: '月ごとの支出',
          headerRight: (): React.FC => {
            const rightButton: React.FC = () => (
              <HeaderRightButton navigation={createNewNavigation} />
            )
            return rightButton
          },
          headerLeft: (): React.FC => {
            const leftButton: React.FC = () => (
              <HeaderLeftButton navigation={authNavigation} />
            )
            return leftButton
          }
        }}
      />
      <MainStack.Screen
        name="Daily"
        component={paymentListDailyScreen}
        options={{
          headerBackTitle: '戻る',
          title: '日付ごとの支出',
          headerRight: (): React.FC => {
            const rightButton: React.FC = () => (
              <HeaderRightButton navigation={createNewNavigation} />
            )
            return rightButton
          },
          headerLeft: (): React.FC => {
            const leftButton: React.FC = () => (
              <HeaderLeftButton navigation={authNavigation} />
            )
            return leftButton
          }
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
      name="AddInfo"
      component={AddInfoScreen}
      options={{ title: '情報の追加' }}
    />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
  </AuthStack.Navigator>
)

const GroupStackScreen: React.FC = () => (
  <GroupStack.Navigator>
    <GroupStack.Screen name="Group" component={CreateGroupScreen} />
  </GroupStack.Navigator>
)

const RootStackScreen: React.FC = () => (
  <RootStack.Navigator mode="modal" initialRouteName="Auth" headerMode="none">
    <RootStack.Screen name="Main" component={MainStackScreen} />
    <RootStack.Screen name="CreateNew" component={ModalScreen} />
    <RootStack.Screen name="Auth" component={AuthStackScreen} />
    <RootStack.Screen name="Group" component={GroupStackScreen} />
  </RootStack.Navigator>
)

const AppContainer: React.FC = () => <RootStackScreen />
export default AppContainer
