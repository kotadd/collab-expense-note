import { Body, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { Button } from 'react-native';

const NativeHeader = ({ navigation }) => (
  <Header>
    <Left>
      <Button title='戻る' onPress={() => navigation.goBack()} />
    </Left>
    <Body>
      <Title>新規作成</Title>
    </Body>
    <Right></Right>
  </Header>
);

export default NativeHeader;
