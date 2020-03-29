import { Body, Header, Left, Right, Title } from 'native-base'
import React from 'react'
import { Button } from 'react-native'
import { HomeScreenNavigationProp } from '../../../AppContainer'

type HeaderProps = {
  navigation: HomeScreenNavigationProp
}
const NativeHeader: React.FC<HeaderProps> = ({ navigation }: HeaderProps) => (
  <Header>
    <Left>
      <Button title="戻る" onPress={(): void => navigation.goBack()} />
    </Left>
    <Body>
      <Title>新規作成</Title>
    </Body>
    <Right></Right>
  </Header>
)

export default NativeHeader
