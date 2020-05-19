import { useNavigation } from '@react-navigation/native'
import { CardItem, Left, Text } from 'native-base'
import React from 'react'
import { MainScreenNavigationProp } from '../../../AppContainer'

type ContentType = {
  yearMonth: string
  groupAmount: number
  unpaidAmount: number
}

const PaymentListMonthlyContent: React.FC<ContentType> = ({
  yearMonth,
  groupAmount,
  unpaidAmount,
}: ContentType) => {
  const navigation = useNavigation<MainScreenNavigationProp>()
  const yearMonthJa =
    yearMonth.substr(0, 4) + '年' + Number(yearMonth.substr(-2)) + '月'

  return (
    <CardItem
      bordered
      button
      onPress={(): void => {
        navigation.navigate('Daily', {
          yearMonth: yearMonthJa,
        })
      }}
    >
      <Left>
        <Text>{yearMonthJa}</Text>
      </Left>
      <Left>
        <Text>{groupAmount.toLocaleString()} 円</Text>
      </Left>
      <Left>
        <Text>{unpaidAmount.toLocaleString()} 円</Text>
      </Left>
    </CardItem>
  )
}

export default PaymentListMonthlyContent
