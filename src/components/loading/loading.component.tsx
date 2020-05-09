import { Container, Content, Spinner } from 'native-base'
import React from 'react'

const Loading: React.FC = () => (
  <Container>
    <Content>
      <Spinner />
    </Content>
  </Container>
)

export default Loading
