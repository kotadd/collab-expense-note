import { User } from 'firebase'
import { NavigationScreenProp } from 'react-navigation'

export interface UserListProps {
  userList: UserListType
}

export type UserListType = {
  [key: string]: string
}

// -------------React Navigation Definitions-------------
export interface NavigationOptions {
  headerLeft?: () => React.ReactNode
  headerRight?: () => React.ReactNode
  title?: string
}

export interface NavigationProps {
  navigation?: NavigationScreenProp<{}>
  navigationOptions?: NavigationOptions
}

export type NavigationType = NavigationScreenProp<{}>

export interface MonthlyPayments {
  [date: string]: [PaymentType]
}

// -------------Redux Definitions-------------
export interface UserReduxTypes {
  currentUser: User
  user: {
    currentUser: UserType
  }
}

export interface AccountReduxTypes {
  currentPayments: MonthlyPayments
  isPaymentsUpdated: boolean
  account: {
    currentPayments: MonthlyPayments
    isPaymentsUpdated: boolean
  }
}

// -------------Firebase Definitions-------------
export interface PaymentProps {
  payments: MonthlyPayments
}

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
