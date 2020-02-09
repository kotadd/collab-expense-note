import { Body, Header, Left, Right, Title } from 'native-base'
import React from 'react'
import { Button } from 'react-native'
import { NavigationProps } from '../../screens/types'

const NativeHeader = ({ navigation }: NavigationProps) => (
  <Header>
    <Left>
      <Button title="戻る" onPress={() => navigation.goBack()} />
    </Left>
    <Body>
      <Title>新規作成</Title>
    </Body>
    <Right></Right>
  </Header>
)

export default NativeHeader
