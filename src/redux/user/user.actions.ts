import { UserActionTypes } from './user.types';
import { User } from 'firebase';

export const setCurrentUser = (user: User | {}) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
