import { Form, Icon, Item, Label, Picker } from 'native-base';
import React, { Component } from 'react';

class PickerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
    return this.props.onChange(value);
  }
  render() {
    const { title, placeholder, items } = this.props;

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
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            {doms}
          </Picker>
        </Item>
      </Form>
    );
  }
}

export default PickerInput;
