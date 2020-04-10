import { useNavigation, useRoute } from '@react-navigation/native'
import { Body, CardItem, Icon, Left, Picker, Right, Text } from 'native-base'
import React, { ReactElement } from 'react'
import { connect, useDispatch } from 'react-redux'
import { DetailScreenNavigationProp } from '../../../AppContainer'
import {
  MonthlyPayments,
  PaymentType
} from '../../../repository/firebase/accounts/account-types'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import {
  AccountReduxTypes,
  UserListProps,
  UserReduxTypes
} from '../../redux/types'
import { setSelectedUser } from '../../redux/user/user.actions'
import { DailyScreenRouteProp } from '../../screens/payment-list-daily-screen/payment-list-daily-screen'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

const ALL_ITEMS = 'all-items'

type PaymentListDailyProps = {
  currentPayments?: MonthlyPayments | null | undefined
  selectedUser?: string
  userList: UserListProps
}

const PaymentListDaily: React.FC<PaymentListDailyProps> = ({
  currentPayments,
  selectedUser,
  userList
}): ReactElement => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DailyScreenRouteProp>()
  const dispatch = useDispatch()

  const onValueChange: (user: string) => void = user => {
    dispatch(setSelectedUser(user))
  }

  const pickerItems = [
    <Picker.Item label="全体" value="all-items" key="all-items" />
  ]

  for (const key in userList) {
    const pickerItem = (
      <Picker.Item label={userList[key]} value={key} key={key} />
    )
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
        <Text>日付</Text>
      </Left>
      <Body>
        <Text>ショップ</Text>
      </Body>
      <Right>
        <Text>家計費</Text>
      </Right>
      <Right>
        <Text>自分用</Text>
      </Right>
      <Right>
        <Text>精算済</Text>
      </Right>
    </CardItem>
  ]

  if (currentPayments) {
    let resultKey: string
    let currentDom = <></>

    let currentDate: string
    let currentDay: string

    let payment: PaymentType
    const targetPayments = currentPayments[route.params.date]
    navigation.setOptions({ headerTitle: route.params.date })

    if (targetPayments) {
      for (let i = 0; i < targetPayments.length; i++) {
        payment = targetPayments[i]
        if (selectedUser !== 'all-items' && selectedUser !== payment.userID) {
          return <></>
        }

        resultKey = `result-${i}`

        currentDate = timestampToLocaleDate(payment.date, 'ja-JP')

        currentDay = currentDate.replace(/.*月/, '')

        const collectCheckDom = payment.collected ? (
          <Right>
            <Icon
              type="FontAwesome"
              name="check"
              style={{ color: 'green', marginRight: 8 }}
            />
          </Right>
        ) : (
          <Right>
            <Icon type="FontAwesome" name="minus" style={{ marginRight: 10 }} />
          </Right>
        )

        currentDom = (
          <CardItem
            bordered
            button
            key={resultKey}
            onPress={(): void => {
              navigation.navigate('Detail')
            }}
          >
            <Left>
              <Text>{currentDay.toString()}</Text>
            </Left>
            <Body>
              <Text style={{ marginTop: 4 }}>{payment.shopName}</Text>
            </Body>
            <Right>
              <Text>¥{payment.groupAmount.toLocaleString()}</Text>
            </Right>
            <Right>
              <Text>¥{payment.userAmount.toLocaleString()}</Text>
            </Right>
            {collectCheckDom}
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
  user
}: AccountReduxTypes & UserReduxTypes) => {
  currentPayments: MonthlyPayments | null | undefined
  selectedUser: string
} = ({ account, user }: AccountReduxTypes & UserReduxTypes) => ({
  currentPayments: account.currentPayments,
  selectedUser: user.selectedUser
})

export default connect(mapStateToProps, null)(PaymentListDaily)
