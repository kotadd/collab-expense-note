import { Body, CardItem, Icon, Left, Picker, Right, Text } from 'native-base'
import React, { ReactElement, useState } from 'react'
import { connect } from 'react-redux'
import {
  DailyScreenRouteProp,
  DetailScreenNavigationProp
} from '../../../AppContainer'
import {
  MonthlyPayments,
  PaymentType
} from '../../../repository/firebase/accounts/account-types'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { AccountReduxTypes, UserListProps } from '../../redux/types'
import GroupListPicker from '../group-list-picker/group-list-picker.component'

const PaymentListDaily: React.FC<{
  currentPayments?: MonthlyPayments
  navigation: DetailScreenNavigationProp
  route: DailyScreenRouteProp
  userList: UserListProps
}> = ({ currentPayments, navigation, route, userList }): ReactElement => {
  const [selectedUser, setSelectedUser] = useState('all-items')

  const onValueChange: (user: string) => void = user => {
    setSelectedUser(user)
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

  const resultDom = [
    <GroupListPicker
      key={'GroupListPicker'}
      selectedUser={selectedUser}
      onValueChange={onValueChange.bind(this)}
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
    let payment: PaymentType

    let currentDate: string
    let currentDay: string

    const targetPayments = currentPayments[route.params.date]

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
              // navigation.navigate('Details');
              alert('fetched from firestore')
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

const mapStateToProps = ({ account }: AccountReduxTypes) => ({
  currentPayments: account.currentPayments
})

export default connect(mapStateToProps, null)(PaymentListDaily)
