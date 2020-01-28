import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';

class DatePicker extends React.Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <>
        <DateTimePicker
          value={value}
          locale='ja-JA'
          mode='date'
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      </>
    );
  }
}

export default DatePicker;