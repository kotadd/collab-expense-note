import { NavigationStackProp } from 'react-navigation-stack';

export interface IStateToProps {
  user: {
    currentUser: {};
  };
  currentUser: {};
}

export interface INavProps {
  navigation: NavigationStackProp;
}

export type IDispatchToProps = {
  setCurrentUser: (user: {}) => void;
};

export type IDispatchToAccountProps = {
  setCurrentPayments: (payments: {}) => void;
};

export type Props = IStateToProps & INavProps;

export type paymentType = {
  date: string;
  group: string;
  groupAmount: number;
  shopName: string;
  user: string;
  userAmount: number;
};
