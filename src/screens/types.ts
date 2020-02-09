import { NavigationScreenProp } from 'react-navigation';
import { User } from 'firebase';

export interface UserListProps {
  userList: UserListType;
}

export type UserListType = {
  [key: string]: string;
};

// -------------React Navigation Definitions-------------
export interface INavProps {
  navigation: NavigationScreenProp<{}>;
}
export type NavigationProp = NavigationScreenProp<{}>;

// -------------Redux Definitions-------------
export type UserReduxTypes = {
  currentUser: User;
  user: {
    currentUser: UserType;
  };
};

export type AccountReduxTypes = {
  currentPayments: [MonthlyPayments];
  isPaymentsUpdated: boolean;
  account: {
    currentPayments: [MonthlyPayments];
    isPaymentsUpdated: boolean;
  };
};

// -------------Firebase Definitions-------------
export type UserAuthType = firebase.User | null;

export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
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

export type CreatePaymentType = {
  _createdAt?: firebase.firestore.Timestamp;
  _updatedAt?: firebase.firestore.Timestamp;
  collected: boolean;
  date: Date;
  groupAmount: number;
  groupID?: string;
  purchaseMemo: string;
  shopName: string;
  usage: string;
  userAmount: number;
  userID?: string;
};

export type MonthlyPayments = {
  (date: string): [PaymentType];
};

export interface PaymentProps {
  payments: [MonthlyPayments];
}

export type UserType = {
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
  accountID: string;
  email: string;
  groupID: string;
  name: string;
};
export interface UserProps {
  user: {
    currentUser: UserType;
  };
}

export type GroupType = {
  _createdAt: firebase.firestore.Timestamp;
  _updatedAt: firebase.firestore.Timestamp;
  accountID: string;
  groupName: string;
  userIDs: [string];
};
export interface GroupProps {
  group: GroupType;
}
