import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackProp
} from 'react-navigation-stack';
import AppReduxRoot from './AppReduxRoot';
import HomeScreen from './src/screens/homescreen/homescreen';
import LoginScreen from './src/screens/loginscreen/loginscreen';
import ModalScreen from './src/screens/modalscreen/modalscreen';
import paymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen';

const MainStack = createStackNavigator({
  Root: {
    screen: AppReduxRoot
  },
  Home: {
    screen: HomeScreen
    // navigationOptions: {
    //   headerBackTitle: '戻る'
    // }
  },
  Daily: {
    screen: paymentListDailyScreen
  }
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen
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

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      App: RootStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'App'
    }
  )
);

export default AppContainer;
