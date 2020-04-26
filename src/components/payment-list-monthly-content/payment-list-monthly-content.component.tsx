import React from 'react'
import { CardItem, Left, Right, Body, Text } from 'native-base'
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types'
import { MainStackParamList } from '../../../AppContainer'

type ContentType = {
  navigation: StackNavigationProp<MainStackParamList, 'Daily'>
  totalKey: string
  yearMonth: string
  totalVal: number
  uncollectedVal: number
}

const PaymentListMonthlyContent: React.FC<ContentType> = ({
  totalKey,
  navigation,
  yearMonth,
  totalVal,
  uncollectedVal,
}: ContentType) => {
  return (
    <CardItem
      bordered
      button
      key={totalKey}
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
