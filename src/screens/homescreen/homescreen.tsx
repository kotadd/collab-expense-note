import { Container, Content } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import NativeFooter from '../../components/native-footer/native-footer.component';
import NativeHeader from '../../components/native-header/native-header.component';
import CardList from '../../components/card-list/card-list.component';

const HomeScreen = () => (
  <Container>
    <NativeHeader />
    <CardList />
    <NativeFooter />
  </Container>
);

export default HomeScreen;
