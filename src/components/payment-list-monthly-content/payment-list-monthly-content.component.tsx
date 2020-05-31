import { useNavigation } from '@react-navigation/native'
import { CardItem, Left, Text } from 'native-base'
import React from 'react'
import { MainScreenNavigationProp } from '../../../AppContainer'

type ContentType = {
  year: number
  month: number
  groupAmount: number
  uncollectedAmount: number
}

const PaymentListMonthlyContent: React.FC<ContentType> = ({
  year,
  month,
  groupAmount,
  uncollectedAmount,
}: ContentType) => {
  const navigation = useNavigation<MainScreenNavigationProp>()

  return (
    <CardItem
      bordered
      button
      onPress={(): void => {
        navigation.navigate('Daily', {
          year,
          month,
        })
      }}
    >
      <Left>
        <Text>{`${year}年${month}月`}</Text>
      </Left>
      <Left>
        <Text>{groupAmount.toLocaleString()} 円</Text>
      </Left>
      <Left>
        <Text>{uncollectedAmount.toLocaleString()} 円</Text>
      </Left>
    </CardItem>
  )
}

export default PaymentListMonthlyContent
