import React from 'react'
import { Picker } from 'react-native'
import { useDispatch } from 'react-redux'
import { UserListProps } from '../../redux/types'
import { setSelectedUser } from '../../redux/user/user.actions'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

const ALL_ITEMS = 'all-items'

type ToggleMemberProps = {
  userList: UserListProps
  selectedUser: string | null
}

const ToggleMember: React.FC<ToggleMemberProps> = ({
  userList,
  selectedUser,
}: ToggleMemberProps) => {
  const dispatch = useDispatch()

  const pickerItems = [
    <Picker.Item label="全体" value={ALL_ITEMS} key={ALL_ITEMS} />,
  ]

  const onValueChange: (user: string) => void = (user) => {
    dispatch(setSelectedUser(user))
  }

  for (const key in userList) {
    const { name, id } = userList[key]
    const pickerItem = <Picker.Item label={name} value={id} key={id} />
    pickerItems.push(pickerItem)
  }

  if (!selectedUser) selectedUser = ALL_ITEMS

  return (
    <GroupListPicker
      key={'GroupListPicker'}
      selectedUser={selectedUser}
      onValueChange={onValueChange}
      pickerItems={pickerItems}
    />
  )
}

export default ToggleMember
