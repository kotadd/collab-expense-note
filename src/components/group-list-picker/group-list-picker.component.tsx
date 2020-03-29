import * as React from 'react'
import { Item, Picker, Icon } from 'native-base'
import GroupListHeader from '../group-list-header/group-list-header.component'
import { ReactElement } from 'react'

type GroupListPickerProps = {
  selectedUser: string
  onValueChange: (user: string) => void
  pickerItems: JSX.Element[]
}

const GroupListPicker: React.FC<GroupListPickerProps> = ({
  selectedUser,
  onValueChange,
  pickerItems
}: GroupListPickerProps) => (
  <>
    <Item picker key="picker-item">
      <Picker
        key="picker-dropdown"
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder="全体"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={selectedUser}
        onValueChange={onValueChange}
        renderHeader={(backAction): ReactElement => GroupListHeader(backAction)}
      >
        {pickerItems}
      </Picker>
    </Item>
  </>
)

export default GroupListPicker
