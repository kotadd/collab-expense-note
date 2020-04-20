import * as React from 'react'
import { Header, Left, Icon, Button, Title, Right, Body } from 'native-base'
import { ReactElement } from 'react'

const GroupListHeader: (
  backAction: (() => void) | undefined
) => ReactElement = backAction => (
  <Header>
    <Left>
      <Button transparent onPress={backAction}>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body style={{ flex: 3 }}>
      <Title>同じグループのメンバー</Title>
    </Body>
    <Right />
  </Header>
)

export default GroupListHeader
