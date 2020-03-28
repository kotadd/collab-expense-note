import { User } from 'firebase'
import { UserType } from '../../repository/firebase/users/user-types'
import { MonthlyPayments } from '../../repository/firebase/accounts/account-types'

export type UserReduxTypes = {
  currentUser: User
  user: {
    currentUser: UserType
  }
}

export type AccountReduxTypes = {
  currentPayments: MonthlyPayments | null | undefined
  isPaymentsUpdated: boolean
}

export type UserListProps = {
  [key: string]: string
}
