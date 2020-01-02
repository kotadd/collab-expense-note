import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppContainer from './AppContainer';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
