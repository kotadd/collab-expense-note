import React from 'react'
import { Picker } from 'react-native'
import { useDispatch } from 'react-redux'
import { UserListProps } from '../../redux/types'
import { setSelectedUser } from '../../redux/user/user.actions'
import GroupListPicker from '../group-list-picker/group-list-picker.component'
import { SelectedUserProps, ALL_ITEMS_STATE } from '../../redux/user/user.types'

type ToggleMemberProps = {
  userList: UserListProps
  selectedUser: SelectedUserProps
}

const ToggleMember: React.FC<ToggleMemberProps> = ({
  userList,
  selectedUser,
}: ToggleMemberProps) => {
  const dispatch = useDispatch()

  const pickerItems = [
    <Picker.Item
      label="全体"
      value={ALL_ITEMS_STATE}
      key={ALL_ITEMS_STATE.id}
    />,
  ]

  for (const key in userList) {
    const { name, id } = userList[key]
    const pickerItem = (
      <Picker.Item label={name} value={userList[key]} key={id} />
    )
    pickerItems.push(pickerItem)
  }

  if (!selectedUser) selectedUser = ALL_ITEMS_STATE

  const onValueChange: (selectedUser: SelectedUserProps) => void = (
    selectedUser
  ) => {
    dispatch(setSelectedUser(selectedUser))
  }

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
