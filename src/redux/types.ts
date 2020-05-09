import { User } from 'firebase'
import { UserType } from '../../repository/firebase/users/user-types'

export type UserReduxTypes = {
  currentUser: User
  user: {
    currentUser: UserType
    selectedUser: string
  }
}

export type UserListProps = {
  id: string
  name: string
}[]
