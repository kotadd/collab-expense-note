import React from 'react'
import { Picker } from 'react-native'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { UserListProps } from '../../redux/types'
import {
  setSelectedUser,
  SetSelectedUserAction,
} from '../../redux/user/user.actions'
import { ALL_ITEMS_STATE } from '../../redux/user/user.types'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

type ToggleMemberProps = {
  userList: UserListProps | undefined
  selectedUserName: string
}

const ToggleMember: React.FC<ToggleMemberProps> = ({
  userList,
  selectedUserName,
}: ToggleMemberProps) => {
  const dispatch = useDispatch<Dispatch<SetSelectedUserAction>>()

  const pickerItemHeader = (
    <Picker.Item
      label="全体"
      value={ALL_ITEMS_STATE.displayName}
      key={ALL_ITEMS_STATE.id}
    />
  )

  let pickerItems = [
    <Picker.Item
      label="全体"
      value={ALL_ITEMS_STATE.displayName}
      key={ALL_ITEMS_STATE.id}
    />,
  ]

  if (userList) {
    const pickerItemMap = userList.map(({ displayName, id }) => {
      return <Picker.Item label={displayName} value={displayName} key={id} />
    })
    pickerItems = [pickerItemHeader, ...pickerItemMap]
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
