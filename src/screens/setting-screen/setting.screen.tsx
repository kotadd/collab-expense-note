import { useNavigation } from '@react-navigation/native'
import { Card, CardItem, Container, Content, Left, Text } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import {
  membersSelector,
  monthlySummariesSelector,
  monthlyUserSummariesSelector,
} from '../../redux/group/group.selector'
import {
  findInCollectedLastMonthSummary,
  getTargetUserSummaries,
} from './setting.utils'

const SettingScreen: React.FC = () => {
  const members = useSelector(membersSelector)
  const monthlySummaries = useSelector(monthlySummariesSelector)
  const monthlyUserSummaries = useSelector(monthlyUserSummariesSelector)
  const navigation = useNavigation<RootScreenNavigationProp>()

  const lastMonthSummary = findInCollectedLastMonthSummary(monthlySummaries)

  const targetSummaries = getTargetUserSummaries(
    lastMonthSummary,
    monthlyUserSummaries
  )

  const filteredTargetSummaries = targetSummaries
    ? targetSummaries.filter((v) => v)
    : undefined

  const yearMonth =
    filteredTargetSummaries && filteredTargetSummaries.length > 0
      ? `${filteredTargetSummaries[0].year}年${filteredTargetSummaries[0].month}月分の家計費`
      : undefined

  navigation.setOptions({
    headerTitle: yearMonth,
  })

  const membersDom = filteredTargetSummaries.map((summary) => {
    const member = members.find((member) => member.id === summary?.uid)

    return (
      <CardItem bordered button key={summary?.id}>
        <Left>
          <Text>{member?.displayName}</Text>
        </Left>
        <Left>
          <Text>{summary?.paidAmount} 円</Text>
        </Left>
        <Left>
          <Text>{summary?.uncollectedAmount} 円</Text>
        </Left>
      </CardItem>
    )
  })

  return (
    <Container>
      <Content>
        <Card key="SettingScreen">
          <CardItem header bordered key="HeaderTop">
            <Left>
              <Text>メンバー</Text>
            </Left>
            <Left>
              <Text>支払済</Text>
            </Left>
            <Left>
              <Text>未清算</Text>
            </Left>
          </CardItem>
          {membersDom}
        </Card>
      </Content>
    </Container>
  )
}

export default SettingScreen
