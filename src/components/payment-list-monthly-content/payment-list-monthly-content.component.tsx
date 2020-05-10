import { useNavigation } from '@react-navigation/native'
import { Body, CardItem, Left, Right, Text } from 'native-base'
import React from 'react'
import { MainScreenNavigationProp } from '../../../AppContainer'

type ContentType = {
  yearMonth: string
  totalVal: number
  uncollectedVal: number
}

const PaymentListMonthlyContent: React.FC<ContentType> = ({
  yearMonth,
  totalVal,
  uncollectedVal,
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
        <Text>{totalVal.toLocaleString()} 円</Text>
      </Body>
      <Right>
        <Text>{uncollectedVal.toLocaleString()} 円</Text>
      </Right>
    </CardItem>
  )
}

export default PaymentListMonthlyContent
