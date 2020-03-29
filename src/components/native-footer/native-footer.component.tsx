import { Button, Footer, FooterTab, Icon, Text } from 'native-base'
import React from 'react'

const NativeFooter: React.FC = () => (
  <Footer>
    <FooterTab>
      <Button vertical active>
        <Icon name="apps" />
        <Text>今月の支出</Text>
      </Button>
      <Button vertical>
        <Icon name="person" />
        <Text>プロフィール</Text>
      </Button>
    </FooterTab>
  </Footer>
)

export default NativeFooter
