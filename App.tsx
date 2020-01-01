import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import HomeScreen from './src/screens/homescreen/homescreen';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeScreen />
      </Provider>
    );
  }
}

export default App;
