import { CardItem, Container, Content, Left, Text } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { currentMemberSelector } from '../../redux/group/group.selector'

const SettingScreen: React.FC = () => {
  const members = useSelector(currentMemberSelector)
  const unpaidPayments = 
  const membersDom = members.map((member) => {
    return (
      <CardItem bordered button key={member.id}>
        <Left>
          <Text>{member.displayName}</Text>
        </Left>
      </CardItem>
    )
  })

  return (
    <Container>
      <Content>
        <CardItem
          header
          bordered
          key="headerTop"
          style={{ backgroundColor: '#dce3ea' }}
        >
          <Left>
            <Text>メンバー名称</Text>
          </Left>
        </CardItem>
        {membersDom}
      </Content>
    </Container>
  )
}

export default SettingScreen
