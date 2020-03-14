import { User } from 'firebase'
import { NavigationScreenProp } from 'react-navigation'
import { MonthlyPayments } from '../../repository/firebase/accounts/account-types'
import { UserType } from '../../repository/firebase/users/user-types'

// -------------React Navigation Definitions-------------
export interface NavigationOptions {
  headerLeft?: () => React.ReactNode
  headerRight?: () => React.ReactNode
  title?: string
}

export type NavigationProps = {
  navigation?: NavigationScreenProp<{}>
  navigationOptions?: NavigationOptions
}

export type NavigationType = NavigationScreenProp<{}>

// -------------Redux Definitions-------------
export type UserReduxTypes = {
  currentUser: User
  user: {
    currentUser: UserType
  }
}
