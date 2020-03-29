import { NavigationContainer } from '@react-navigation/native'
import 'firebase/auth'
import 'firebase/firestore'
import { Root } from 'native-base'
import React from 'react'
import { Provider } from 'react-redux'
import AppContainer from './AppContainer'
import store from './src/redux/store'

const App: React.FC = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Root>
        <AppContainer />
      </Root>
    </NavigationContainer>
  </Provider>
)

export default App
