import { Form, Icon, Item, Label, Picker } from 'native-base'
import React, { useState } from 'react'

type PickerInputType = {
  title: string
  placeholder: string
  items: {
    key: string
    type: string
    label: string
  }[]
  onChange: (value: string) => void
}

const PickerInput: React.FC<PickerInputType> = ({
  title,
  placeholder,
  items,
  onChange,
}: PickerInputType) => {
  const [selected, setSelected] = useState('')

  const onValueChange: (value: string) => void = (value) => {
    setSelected(value)
    onChange(value)
    return
  }

  const doms = []

  for (let i = 0; i < items.length; i++) {
    doms.push(
      <Picker.Item
        key={items[i].key}
        label={items[i].label}
        value={items[i].label}
      />
    )
  }

  return (
    <Form>
      <Item picker fixedLabel>
        <Label>{title}：</Label>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: undefined }}
          placeholder={placeholder}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={selected}
          onValueChange={onValueChange}
        >
          {doms}
        </Picker>
      </Item>
    </Form>
  )
}

export default PickerInput
