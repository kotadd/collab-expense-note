import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const emailChanged = text => {
  return {
    type: UserActionTypes.EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: UserActionTypes.PASSWORD_CHANGED,
    payload: text
  };
};
