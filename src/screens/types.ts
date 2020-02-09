import { User } from 'firebase'
import { NavigationScreenProp } from 'react-navigation'

export interface UserListProps {
  userList: UserListType
}

export type UserListType = {
  [key: string]: string
}

// -------------React Navigation Definitions-------------
export interface NavigationProps {
  navigation?: NavigationScreenProp<{}>
  navigationOptions?: {}
}
export type NavigationType = NavigationScreenProp<{}>

// -------------Redux Definitions-------------
export type UserReduxTypes = {
  currentUser: User
  user: {
    currentUser: UserType
  }
}

export type AccountReduxTypes = {
  currentPayments: {
    [date: string]: [PaymentType]
  }
  isPaymentsUpdated: boolean
  account: {
    currentPayments: {
      [date: string]: [PaymentType]
    }
    isPaymentsUpdated: boolean
  }
}

// -------------Firebase Definitions-------------
export interface PaymentProps {
  payments: {
    [date: string]: [PaymentType]
  }
}

export type UserAuthType = firebase.User | null

export type DocType = {
  id: string
  data(): {
    name: string
  }
}

export type PaymentType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  collected: boolean
  date: firebase.firestore.Timestamp
  groupAmount: number
  groupID: string
  purchaseMemo: string
  shopName: string
  usage: string
  userAmount: number
  userID: string
}

export type CreatePaymentType = {
  _createdAt?: firebase.firestore.Timestamp
  _updatedAt?: firebase.firestore.Timestamp
  collected: boolean
  date: Date
  groupAmount: number
  groupID?: string
  purchaseMemo: string
  shopName: string
  usage: string
  userAmount: number
  userID?: string
}

export type UserType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  accountID: string
  email: string
  groupID: string
  name: string
}
export interface UserProps {
  user: {
    currentUser: UserType
  }
}

export type GroupType = {
  _createdAt: firebase.firestore.Timestamp
  _updatedAt: firebase.firestore.Timestamp
  accountID: string
  groupName: string
  userIDs: [string]
}
export interface GroupProps {
  group: GroupType
}
