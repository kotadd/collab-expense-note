import { useNavigation } from '@react-navigation/native'
import { Body, CardItem, Left, Right, Text, View } from 'native-base'
import React, { ReactNode, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { DailyScreenNavigationProp } from '../../../AppContainer'
import {
  useCurrentPayments,
  useGroupUserList,
  useToast,
} from '../../hooks/payment-list.hooks'
import { userSelector } from '../../redux/user/user.selector'
import ToggleMember from '../toggle-member/toggle-member.component'
import { calcMonthlyTotalPayments } from './payment-list-monthly.utils'

const PaymentListMonthly: React.FC = (): ReactElement => {
  const currentUser = useSelector(userSelector)
  const userList = useGroupUserList(currentUser)
  const payments = useCurrentPayments(currentUser)
  useToast(currentUser)

  const paymentsMap = calcMonthlyTotalPayments(payments)
  const navigation = useNavigation<DailyScreenNavigationProp>()

  if (!paymentsMap) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const dom = []

  dom.push(
    <ToggleMember
      key={currentUser.uid}
      userList={userList}
      selectedUser={currentUser.displayName}
    />
  )

  const HeaderDom = (
    <CardItem
      header
      bordered
      key="headerTop"
      style={{ backgroundColor: '#dce3ea' }}
    >
      <Left>
        <Text>該当年月</Text>
      </Left>
      <Body>
        <Text>支出総額</Text>
      </Body>
      <Right>
        <Text>未精算額</Text>
      </Right>
    </CardItem>
  )

  dom.push(HeaderDom)

  const paymentsArr = Object.entries(paymentsMap)
  for (let i = 0; i < paymentsArr.length; i += 2) {
    const total = paymentsArr[i]
    const uncollected = paymentsArr[i + 1]
    const totalKey = total[0]
    const totalVal = total[1]
    const uncollectedVal = uncollected[1]

    const yearMonth = totalKey.split('_')[0]

    dom.push(
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

  return dom
}

export default PaymentListMonthly
