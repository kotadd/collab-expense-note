import { Body, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';

class NativeHeader extends Component {
  render() {
    return (
      <Header>
        <Left></Left>
        <Body>
          <Title>一覧</Title>
        </Body>
        <Right></Right>
      </Header>
    );
  }
}

export default NativeHeader;
