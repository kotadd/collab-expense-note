import 'firebase/auth'
import 'firebase/firestore'
import { Root } from 'native-base'
import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './AppContainer'
import store from './src/redux/store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    )
  }
}

export default App
