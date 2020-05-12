import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import { Button, Icon, Text } from 'native-base'
import * as React from 'react'
import { ReactElement } from 'react'
import { enableScreens } from 'react-native-screens'
import { PaymentType } from './repository/firebase/payments/payment-types'
import HeaderLeftLogoutButton from './src/components/header/header-left-logout-button.component'
import HeaderRightCreateButton from './src/components/header/header-right-create-button.component'
import CreateGroupScreen from './src/screens/create-group-screen/create-group.screen'
import CreateNewScreen from './src/screens/create-new-screen/create-new.screen'
import EditPaymentScreen from './src/screens/edit-payment-screen/edit-payment.screen'
import JoinGroupScreen from './src/screens/join-group-screen/join-group.screen'
import LoginScreen from './src/screens/login-screen/login.screen'
import PaymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily.screen'
import PaymentListDetailScreen from './src/screens/payment-list-detail-screen/payment-list-detail.screen'
import PaymentListMonthlyScreen from './src/screens/payment-list-monthly-screen/payment-list-monthly.screen'
import ProfileScreen from './src/screens/profile-screen/profile.screen'
import SignupScreen from './src/screens/signup-screen/signup.screen'
import TabBarIcons from './src/components/tab-bar-icons/tab-bar-icons.component'
import { useDispatch } from 'react-redux'

export type MainStackParamList = {
  Monthly: undefined
  Daily: { yearMonth: string }
  Detail: { yearMonth: string; day: string; paymentID: string }
}

type MainParams = {
  screen: 'Monthly' | 'Daily' | 'Detail'
  params?: {
    yearMonth?: string
    day?: string
    paymentID?: string
  }
}

export type ModalStackParamList = {
  CreateNew: { from: 'monthly' | 'daily' }
  Edit: { payment: PaymentType; paymentID: string }
}

type ModalParams = {
  screen: 'CreateNew' | 'Edit'
  params: {
    from?: 'monthly' | 'daily'
    payment?: PaymentType
    paymentID?: string
  }
}

export type HomeStackParamList = {
  Main: MainParams
  Modal: ModalParams
}

type HomeParams = {
  screen: 'Main' | 'Modal'
  params: MainParams | ModalParams
}

type ProfileParams = {
  screen: 'Profile'
}

export type ProfileStackParamList = {
  Profile: ProfileParams
}

export type HomeTabsParamList = {
  Home: HomeParams
  Profile: ProfileParams
}

type HomeTabsParams = {
  screen: 'Home' | 'Profile'
  params: HomeParams | ProfileParams
}

export type AuthStackParamList = {
  Login: undefined
  Signup: undefined
  CreateGroup: undefined
  JoinGroup: undefined
}

type AuthParams = {
  screen: 'Login' | 'Signup' | 'CreateGroup' | 'JoinGroup'
}

export type RootStackParamList = {
  Auth: AuthParams
  HomeTabs: HomeTabsParams
}

export type MainScreenNavigationProp =
  | StackNavigationProp<MainStackParamList, 'Monthly'>
  | StackNavigationProp<MainStackParamList, 'Daily'>
  | StackNavigationProp<MainStackParamList, 'Detail'>

export type AuthScreenNavigationProp =
  | StackNavigationProp<AuthStackParamList, 'Login'>
  | StackNavigationProp<AuthStackParamList, 'Signup'>
  | StackNavigationProp<AuthStackParamList, 'CreateGroup'>
  | StackNavigationProp<AuthStackParamList, 'JoinGroup'>

export type ModalScreenNavigationProp =
  | StackNavigationProp<ModalStackParamList, 'CreateNew'>
  | StackNavigationProp<ModalStackParamList, 'Edit'>

export type HomeScreenNavigationProp =
  | StackNavigationProp<HomeStackParamList, 'Main'>
  | StackNavigationProp<HomeStackParamList, 'Modal'>

export type HomeTabsNavigationProp =
  | BottomTabNavigationProp<HomeTabsParamList, 'Home'>
  | BottomTabNavigationProp<HomeTabsParamList, 'Profile'>

export type RootScreenNavigationProp =
  | StackNavigationProp<RootStackParamList, 'Auth'>
  | StackNavigationProp<RootStackParamList, 'HomeTabs'>

const MainStack = createStackNavigator<MainStackParamList>()
const AuthStack = createStackNavigator<AuthStackParamList>()
const ModalStack = createStackNavigator<ModalStackParamList>()
const HomeStack = createStackNavigator<HomeStackParamList>()
const ProfileStack = createStackNavigator<ProfileStackParamList>()
const RootTab = createBottomTabNavigator<HomeTabsParamList>()
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
          headerTitle: '支払いの詳細',
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
      options={{ title: 'アカウント作成' }}
    />
    <AuthStack.Screen
      name="CreateGroup"
      component={CreateGroupScreen}
      options={{
        headerBackTitle: '戻る',
        headerTitle: 'グループの作成',
      }}
    />
    <AuthStack.Screen
      name="JoinGroup"
      component={JoinGroupScreen}
      options={{
        headerBackTitle: '戻る',
        headerTitle: 'グループに参加',
      }}
    />
  </AuthStack.Navigator>
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
      <ModalStack.Screen
        name="Edit"
        component={EditPaymentScreen}
        options={{
          headerTitle: '修正',
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
    </ModalStack.Navigator>
  )
}

const HomeStackScreen: React.FC = () => (
  <HomeStack.Navigator mode="modal" headerMode="none">
    <HomeStack.Screen name="Main" component={MainStackScreen} />
    <HomeStack.Screen name="Modal" component={ModalStackScreen} />
  </HomeStack.Navigator>
)

const ProfileStackScreen: React.FC = () => {
  const navigation = useNavigation<RootScreenNavigationProp>()

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'プロフィール',
          headerLeft: (): ReactElement => {
            const leftButton = (
              <HeaderLeftLogoutButton navigation={navigation} />
            )
            return leftButton
          },
        }}
      />
    </ProfileStack.Navigator>
  )
}

const HomeTabs: React.FC = () => (
  <RootTab.Navigator
    screenOptions={({ route }): BottomTabNavigationOptions => ({
      tabBarIcon: ({ focused, color, size }): ReactElement => {
        const icons = (
          <TabBarIcons
            route={route}
            focused={focused}
            color={color}
            size={size}
          />
        )
        return icons
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    }}
  >
    <RootTab.Screen name="Home" component={HomeStackScreen} />
    <RootTab.Screen name="Profile" component={ProfileStackScreen} />
  </RootTab.Navigator>
)

const RootStackScreen: React.FC = () => (
  <RootStack.Navigator mode="modal" initialRouteName="Auth" headerMode="none">
    <RootStack.Screen name="Auth" component={AuthStackScreen} />
    <RootStack.Screen name="HomeTabs" component={HomeTabs} />
  </RootStack.Navigator>
)

const AppContainer: React.FC = () => (
  <NavigationContainer>
    <RootStackScreen />
  </NavigationContainer>
)

enableScreens()

export default AppContainer
