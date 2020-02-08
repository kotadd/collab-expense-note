import {
  Body,
  CardItem,
  Left,
  Right,
  Text,
  CheckBox,
  Icon,
  Item,
  Picker,
  Header,
  Button,
  Title
} from 'native-base';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PaymentType } from '../../screens/types';

let dateOption = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weeday: 'long'
};

const PaymentListDaily = ({ currentPayments, navigation, userList }) => {
  const [selectedUser, setSelectedUser] = useState('all-items');

  const onValueChange = (user: string) => {
    setSelectedUser(user);
  };

  let pickerItems = [
    <Picker.Item label='全体' value='all-items' key='all-items' />
  ];
  for (let key in userList) {
    let pickerItem = (
      <Picker.Item label={userList[key]} value={key} key={key} />
    );
    pickerItems.push(pickerItem);
  }

  let resultDom = [
    <Item picker key='picker-item'>
      <Picker
        key='picker-dropdown'
        mode='dropdown'
        iosIcon={<Icon name='arrow-down' />}
        style={{ width: undefined }}
        placeholder='全体'
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor='#007aff'
        selectedValue={selectedUser}
        onValueChange={onValueChange.bind(this)}
        renderHeader={backAction => (
          <Header style={{ backgroundColor: '#f44242' }}>
            <Left>
              <Button transparent onPress={backAction}>
                <Icon name='arrow-back' style={{ color: '#fff' }} />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ color: '#fff' }}>同じグループのメンバー</Title>
            </Body>
            <Right />
          </Header>
        )}
      >
        {pickerItems}
      </Picker>
    </Item>,
    <CardItem
      header
      bordered
      key='headerTop'
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
  ];

  if (currentPayments) {
    let resultKey: string;
    let currentDom = <></>;
    let payment: PaymentType;

    let currentDate: string;
    let currentDay: string;

    const targetPayments = currentPayments[navigation.state.params.date];

    if (targetPayments) {
      for (let i = 0; i < targetPayments.length; i++) {
        payment = targetPayments[i];
        if (selectedUser !== 'all-items' && selectedUser !== payment.userID)
          return;

        resultKey = `result-${i}`;

        currentDate = payment.date
          .toDate()
          .toLocaleDateString('ja-JP', dateOption);

        currentDay = currentDate.replace(/.*月/, '');

        const collectCheckDom = payment.collected ? (
          <Right>
            <Icon
              type='FontAwesome'
              name='check'
              style={{ color: 'green', marginRight: 8 }}
            />
          </Right>
        ) : (
          <Right>
            <Icon type='FontAwesome' name='minus' style={{ marginRight: 10 }} />
          </Right>
        );

        currentDom = (
          <CardItem
            bordered
            button
            key={resultKey}
            onPress={() => {
              // navigation.navigate('Details');
              alert('fetched from firestore');
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
        );

        resultDom.push(currentDom);
      }
    }
  }

  return resultDom;
};

const mapStateToProps = ({ account }) => ({
  currentPayments: account.currentPayments
});

export default connect(mapStateToProps, null)(PaymentListDaily);
