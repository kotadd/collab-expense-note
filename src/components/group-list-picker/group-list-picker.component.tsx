import { Icon, Item, Picker } from 'native-base'
import * as React from 'react'
import { ReactElement } from 'react'
import SelectListHeader from '../group-list-header/group-list-header.component'

type GroupListPickerProps = {
  selectedUserName: string
  onValueChange: (selectedUserName: string) => void
  pickerItems: JSX.Element[]
}

const GroupListPicker: React.FC<GroupListPickerProps> = ({
  selectedUserName,
  onValueChange,
  pickerItems,
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
        selectedValue={selectedUserName}
        onValueChange={onValueChange}
        renderHeader={(backAction): ReactElement =>
          SelectListHeader(backAction, '同じグループのメンバー')
        }
      >
        {pickerItems}
      </Picker>
    </Item>
  </>
)

export default GroupListPicker
