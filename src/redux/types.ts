import { User } from 'firebase'
import { UserType } from '../../repository/firebase/users/user-types'
import { MonthlyPayments } from '../../repository/firebase/accounts/account-types'

export type UserReduxTypes = {
  currentUser: User
  isUserUpdated: boolean
  user: {
    currentUser: UserType
    selectedUser: string
  }
}

export type AccountReduxTypes = {
  currentPayments: MonthlyPayments | null | undefined
  isPaymentsUpdated: boolean
  account: {
    currentPayments: MonthlyPayments | null | undefined
  }
}

export type UserListProps = {
  id: string
  name: string
}[]
