import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PaymentListDaily from './src/components/payment-list-daily/payment-list-daily.component';
import HomeScreen from './src/screens/homescreen/homescreen';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Daily: {
      screen: PaymentListDaily
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: '一覧'
    }
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    }
  },
  {
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
