import { Form, Icon, Item, Label, Picker } from 'native-base';
import React, { useState } from 'react';

const PickerInput = ({ title, placeholder, items, onChange }) => {
  const [selected, setSelected] = useState(undefined);

  const onValueChange = (value: string) => {
    setSelected(value);
    onChange(value);
    return;
  };

  let doms = [];

  for (let i = 0; i < items.length; i++) {
    doms.push(
      <Picker.Item
        key={items[i].key}
        label={items[i].label}
        value={items[i].label}
      />
    );
  }

  return (
    <Form>
      <Item picker fixedLabel>
        <Label>{title}：</Label>
        <Picker
          mode='dropdown'
          iosIcon={<Icon name='arrow-down' />}
          style={{ width: undefined }}
          placeholder={placeholder}
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor='#007aff'
          selectedValue={selected}
          onValueChange={onValueChange.bind(this)}
        >
          {doms}
        </Picker>
      </Item>
    </Form>
  );
};

export default PickerInput;
