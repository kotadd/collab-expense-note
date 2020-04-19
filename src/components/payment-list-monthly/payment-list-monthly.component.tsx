import { useNavigation } from '@react-navigation/native'
import { Body, CardItem, Left, Picker, Right, Text } from 'native-base'
import React, { ReactElement } from 'react'
import { connect, useDispatch } from 'react-redux'
import { DailyScreenNavigationProp } from '../../../AppContainer'
import {
  MonthlyPayments,
  PaymentType,
} from '../../../repository/firebase/accounts/account-types'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import {
  AccountReduxTypes,
  UserListProps,
  UserReduxTypes,
} from '../../redux/types'
import { setSelectedUser } from '../../redux/user/user.actions'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

const ALL_ITEMS = 'all-items'

type AccumulatorType = {
  [key: string]: number
}

type PaymentListMonthlyProps = {
  currentPayments?: MonthlyPayments | null | undefined
  selectedUser?: string
  userList: UserListProps
}

const PaymentListMonthly: React.FC<PaymentListMonthlyProps> = ({
  currentPayments,
  selectedUser,
  userList,
}): ReactElement => {
  const navigation = useNavigation<DailyScreenNavigationProp>()
  const dispatch = useDispatch()

  const onValueChange: (user: string) => void = (user) => {
    dispatch(setSelectedUser(user))
  }

  const pickerItems = [
    <Picker.Item label="全体" value={ALL_ITEMS} key={ALL_ITEMS} />,
  ]

  for (const key in userList) {
    const { name, uid } = userList[key]
    const pickerItem = <Picker.Item label={name} value={uid} key={uid} />
    pickerItems.push(pickerItem)
  }

  if (!selectedUser) selectedUser = ALL_ITEMS

  const resultDom = [
    <GroupListPicker
      key={'GroupListPicker'}
      selectedUser={selectedUser}
      onValueChange={onValueChange}
      pickerItems={pickerItems}
    />,
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
    </CardItem>,
  ]

  if (currentPayments) {
    let resultKey: string
    let currentDom = <></>

    let currentDate: string
    let yearMonth: string

    const resultKeys = Object.keys(currentPayments)

    resultKeys.sort((a, b) => {
      const leftVal = a.match(/\d+/g)
      const rightVal = b.match(/\d+/g)

      if (!leftVal || !rightVal) return 0

      const leftYear = parseInt(leftVal[0])
      const leftMonth = parseInt(leftVal[1])
      const rightYear = parseInt(rightVal[0])
      const rightMonth = parseInt(rightVal[1])

      if (
        leftYear < rightYear ||
        (leftYear == rightYear && leftMonth < rightMonth)
      ) {
        return 1
      }
      if (
        leftYear > rightYear ||
        (leftYear == rightYear && leftMonth > rightMonth)
      ) {
        return -1
      }
      return 0
    })

    for (let i = 0; i < resultKeys.length; i++) {
      resultKey = resultKeys[i]

      const resultVals = currentPayments[resultKey]

      const paymentsMap = resultVals.reduce(
        (accumulator: AccumulatorType, payment: PaymentType) => {
          if (selectedUser === ALL_ITEMS || selectedUser === payment.userID) {
            currentDate = timestampToLocaleDate(payment.date, 'ja-JP')

            yearMonth = currentDate.replace(/(\d\d|\d)日.*/, '')

            const totalAmountKey = `${yearMonth}_total`
            const uncollectedAmountKey = `${yearMonth}_uncollected`

            const groupAmount = payment.groupAmount
            let uncollectedAmount = 0
            if (!payment.collected) {
              uncollectedAmount = groupAmount - payment.userAmount
            }

            accumulator[totalAmountKey]
              ? (accumulator[totalAmountKey] += groupAmount)
              : (accumulator[totalAmountKey] = groupAmount)

            accumulator[uncollectedAmountKey]
              ? (accumulator[uncollectedAmountKey] += uncollectedAmount)
              : (accumulator[uncollectedAmountKey] = uncollectedAmount)
          }

          return accumulator
        },
        {}
      )

      const monthlyKeys = Object.keys(paymentsMap)

      for (let j = 0; j < monthlyKeys.length / 2; j++) {
        const totalAmount = paymentsMap[monthlyKeys[j]]
        const uncollectedAmount = paymentsMap[monthlyKeys[j + 1]]

        const yearMonth = resultKey

        currentDom = (
          <CardItem
            bordered
            button
            key={resultKey + j}
            onPress={(): void => {
              navigation.navigate('Daily', {
                date: yearMonth,
              })
            }}
          >
            <Left>
              <Text>{resultKey}</Text>
            </Left>
            <Body>
              <Text>{totalAmount.toLocaleString()} 円</Text>
            </Body>
            <Right>
              <Text>{uncollectedAmount.toLocaleString()} 円</Text>
            </Right>
          </CardItem>
        )
        resultDom.push(currentDom)
      }
    }
  }
  return resultDom
}

const mapStateToProps: ({
  account,
  user,
}: AccountReduxTypes & UserReduxTypes) => {
  currentPayments: MonthlyPayments | null | undefined
  selectedUser: string
} = ({ account, user }: AccountReduxTypes & UserReduxTypes) => ({
  currentPayments: account.currentPayments,
  selectedUser: user.selectedUser,
})

export default connect(mapStateToProps, null)(PaymentListMonthly)
