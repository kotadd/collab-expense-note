import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppReduxRoot from './AppReduxRoot';
import PaymentListMonthlyScreen from './src/screens/payment-list-monthly-screen/payment-list-monthly-screen';
import LoginScreen from './src/screens/loginscreen/loginscreen';
import ModalScreen from './src/screens/modalscreen/modalscreen';
import PaymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen';
import SignupScreen from './src/screens/signupscreen/signupscreen';
import AddInfoScreen from './src/screens/add-info-screen/add-info.screen';
import CreateGroupScreen from './src/screens/create-group-screen/create-group.screen';

const MainStack = createStackNavigator({
  Home: {
    screen: PaymentListMonthlyScreen
    // navigationOptions: {
    //   headerBackTitle: '戻る'
    // }
  },
  // Root: {
  //   screen: AppReduxRoot
  // },
  Daily: {
    screen: PaymentListDailyScreen
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    CreateNew: {
      screen: ModalScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  AddInfo: {
    screen: AddInfoScreen
  },
  Signup: {
    screen: SignupScreen
  }
});

const CreateGroupStack = createStackNavigator({
  Group: {
    screen: CreateGroupScreen
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: RootStack,
      Auth: AuthStack,
      Group: CreateGroupStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default AppContainer;
