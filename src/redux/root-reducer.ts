import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import accountReducer from './account/account.reducer';

export interface UserState {
  currentUser: any;
}

export interface AccountState {
  currentPayments: any;
}

export type AppState = {
  user: UserState;
  account: AccountState;
};

export default combineReducers<AppState>({
  user: userReducer,
  account: accountReducer
});
