import { Container, Content, Header, Spinner } from 'native-base'
import React from 'react'

const Loading: React.FC = () => (
  <Container>
    <Header />
    <Content>
      <Spinner />
      <Spinner color="red" />
      <Spinner color="green" />
      <Spinner color="blue" />
    </Content>
  </Container>
)

export default Loading
