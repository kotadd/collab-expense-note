import { Body, Header, Left, Right, Title } from 'native-base';
import React, { Component } from 'react';
import { Button } from 'react-native';

class NativeHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button title='Back' onPress={() => this.props.navigation.goBack()} />
        </Left>
        <Body>
          <Title>新規作成</Title>
        </Body>
        <Right></Right>
      </Header>
    );
  }
}

export default NativeHeader;
