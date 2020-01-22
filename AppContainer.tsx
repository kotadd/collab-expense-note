import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppReduxRoot from './AppReduxRoot';
import HomeScreen from './src/screens/homescreen/homescreen';
import LoginScreen from './src/screens/loginscreen/loginscreen';
import ModalScreen from './src/screens/modalscreen/modalscreen';
import paymentListDailyScreen from './src/screens/payment-list-daily-screen/payment-list-daily-screen';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Root: {
      screen: AppReduxRoot
    },
    Daily: {
      screen: paymentListDailyScreen
    },
    Login: {
      screen: LoginScreen
    }
  },
  {
    initialRouteName: 'Root',
    defaultNavigationOptions: {
      title: 'ログイン'
    }
  }
);

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

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
