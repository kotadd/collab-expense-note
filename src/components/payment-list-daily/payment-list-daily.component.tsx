import {
  Body,
  CardItem,
  Icon,
  Item,
  Left,
  Picker,
  Right,
  Text
} from 'native-base'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import {
  AccountReduxTypes,
  NavigationProps,
  PaymentType,
  UserListProps
} from '../../screens/types'
import GroupListHeader from '../group-list-header/group-list-header.component'

const PaymentListDaily = ({
  currentPayments,
  navigation,
  userList
}: AccountReduxTypes & NavigationProps & UserListProps) => {
  const [selectedUser, setSelectedUser] = useState('all-items')

  const onValueChange = (user: string) => {
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
    <Item picker key="picker-item">
      <Picker
        key="picker-dropdown"
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        style={{ width: undefined }}
        placeholder="全体"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={selectedUser}
        onValueChange={onValueChange.bind(this)}
        renderHeader={backAction => GroupListHeader(backAction)}
      >
        {pickerItems}
      </Picker>
    </Item>,
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

    const targetDate = navigation.state.params
      ? (navigation.state.params.date as string)
      : ''
    const targetPayments = currentPayments[targetDate]

    if (targetPayments) {
      for (let i = 0; i < targetPayments.length; i++) {
        payment = targetPayments[i]
        if (selectedUser !== 'all-items' && selectedUser !== payment.userID)
          return

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
            onPress={() => {
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
