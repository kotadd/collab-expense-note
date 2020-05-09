import DateTimePicker from '@react-native-community/datetimepicker'
import React from 'react'

type DatePickerType = {
  value: Date
  onChange: (event: Event, date?: Date) => void
}

const DatePicker: React.FC<DatePickerType> = ({
  value,
  onChange,
}: DatePickerType) => {
  return (
    <>
      <DateTimePicker
        value={value}
        locale="ja-JA"
        mode="date"
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </>
  )
}

export default DatePicker
