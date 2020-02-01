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
  collected: boolean;
  date: firebase.firestore.Timestamp;
  groupAmount: number;
  groupID: string;
  purchaseMemo: string;
  shopName: string;
  usage: string;
  userAmount: number;
  userID: string;
};
