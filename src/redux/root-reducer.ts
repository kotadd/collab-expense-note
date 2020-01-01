import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';

export interface UserState {
  currentUser: any;
}

export type AppState = {
  user: UserState;
};

export default combineReducers<AppState>({
  user: userReducer
});
