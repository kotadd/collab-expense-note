import { Form, Icon, Item, Label, Picker } from 'native-base'
import React, { useState, ReactElement } from 'react'
import SelectListHeader from '../select-list-header/select-list-header.component'

type PickerInputProps = {
  title: string
  placeholder?: string
  items: {
    key: string
    label: string
  }[]
  item?: string
  onChange: (value: string) => void
}

const PickerInput: React.FC<PickerInputProps> = ({
  title,
  placeholder,
  items,
  item,
  onChange,
}: PickerInputProps) => {
  const [selected, setSelected] = useState(item)

  const onValueChange: (value: string) => void = (value) => {
    setSelected(value)
    onChange(value)
    return
  }

  const doms = items.map(({ key, label }) => (
    <Picker.Item key={key} label={label} value={label} />
  ))

  return (
    <Form>
      <Item picker fixedLabel>
        <Label>{title}</Label>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" style={{ marginLeft: 0 }} />}
          style={{ width: undefined, marginRight: -12 }}
          placeholder={placeholder}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={selected}
          onValueChange={onValueChange}
          renderHeader={(backAction): ReactElement =>
            SelectListHeader(backAction, title)
          }
        >
          {doms}
        </Picker>
      </Item>
    </Form>
  )
}

export default PickerInput
