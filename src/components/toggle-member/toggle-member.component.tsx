import React from 'react'
import { Picker } from 'react-native'
import { useDispatch } from 'react-redux'
import { UserListProps } from '../../redux/types'
import { setSelectedUser } from '../../redux/user/user.actions'
import { ALL_ITEMS_STATE } from '../../redux/user/user.types'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

type ToggleMemberProps = {
  userList: UserListProps
  selectedUserName: string
}

const ToggleMember: React.FC<ToggleMemberProps> = ({
  userList,
  selectedUserName,
}: ToggleMemberProps) => {
  const dispatch = useDispatch()

  const pickerItems = [
    <Picker.Item
      label="全体"
      value={ALL_ITEMS_STATE.name}
      key={ALL_ITEMS_STATE.id}
    />,
  ]

  for (const key in userList) {
    const { name, id } = userList[key]
    const pickerItem = <Picker.Item label={name} value={name} key={id} />
    pickerItems.push(pickerItem)
  }

  if (!selectedUserName) selectedUserName = 'all-items'

  const onValueChange: (selectedUserName: string) => void = (
    selectedUserName
  ) => {
    dispatch(setSelectedUser(selectedUserName))
  }

  return (
    <GroupListPicker
      key={'GroupListPicker'}
      selectedUserName={selectedUserName}
      onValueChange={onValueChange}
      pickerItems={pickerItems}
    />
  )
}

export default ToggleMember
