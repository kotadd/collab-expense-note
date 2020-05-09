import * as React from 'react'
import { Header, Left, Icon, Button, Title, Right, Body } from 'native-base'
import { ReactElement } from 'react'

const SelectListHeader: (
  backAction: (() => void) | undefined,
  title: string
) => ReactElement = (backAction, title) => (
  <Header>
    <Left>
      <Button transparent onPress={backAction}>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body style={{ flex: 3 }}>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
)

export default SelectListHeader
