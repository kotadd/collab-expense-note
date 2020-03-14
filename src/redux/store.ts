import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './root-reducer'

const middlewares = [reduxThunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
)

export default store

export type ReduxAppState = ReturnType<typeof store.getState>
