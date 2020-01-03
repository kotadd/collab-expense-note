import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppReduxRoot from './AppReduxRoot';
import AppContainer from './AppContainer';
import { Root } from 'native-base';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

export default App;
