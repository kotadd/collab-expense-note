import * as React from 'react';
import { Header, Left, Icon, Button, Title, Right, Body } from 'native-base';

const GroupListHeader = (backAction: any) => (
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
);

export default GroupListHeader;
