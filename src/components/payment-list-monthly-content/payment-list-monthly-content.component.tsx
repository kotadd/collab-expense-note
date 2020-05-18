import { useNavigation } from '@react-navigation/native'
import { Body, CardItem, Left, Right, Text } from 'native-base'
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

  return (
    <CardItem
      bordered
      button
      onPress={(): void => {
        navigation.navigate('Daily', {
          yearMonth: yearMonth,
        })
      }}
    >
      <Left>
        <Text>{yearMonth}</Text>
      </Left>
      <Body>
        <Text>{groupAmount.toLocaleString()} 円</Text>
      </Body>
      <Right>
        <Text>{unpaidAmount.toLocaleString()} 円</Text>
      </Right>
    </CardItem>
  )
}

export default PaymentListMonthlyContent
