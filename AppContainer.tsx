import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppReduxRoot from './AppReduxRoot';
import HomeScreen from './src/screens/homescreen/homescreen';
import LoginScreen from './src/screens/loginscreen/loginscreen';
import ModalScreen from './src/screens/modalscreen/modalscreen';
import paymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen';

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen
    // navigationOptions: {
    //   headerBackTitle: '戻る'
    // }
  },
  Root: {
    screen: AppReduxRoot
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
      initialRouteName: 'Auth'
    }
  )
);

export default AppContainer;
