import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Col,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Item,
  Label,
  Text,
} from 'native-base'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { currentUserSelector } from '../../redux/user/user.selector'
import { joinGroup } from './join-group.utils'

const JoinGroupForm: React.FC = () => {
  const [displayName, setDisplayName] = useState('')
  const [groupID, setGroupID] = useState('')
  const navigation = useNavigation<RootScreenNavigationProp>()
  const currentUser = useSelector(currentUserSelector)

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon
            type="FontAwesome"
            active
            name="user"
            style={{ marginRight: 8 }}
          />
          <Label>表示するあなたの名前を入力してください</Label>
          <Input
            defaultValue=""
            onChangeText={(text): void => setDisplayName(text)}
            value={displayName}
          />
        </Item>
        <Item floatingLabel>
          <Icon type="FontAwesome" active name="users" />
          <Label>参加するグループのIDを入力してください</Label>
          <Input
            defaultValue=""
            onChangeText={(text): void => setGroupID(text)}
            value={groupID}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button
          block
          dark
          onPress={(): void =>
            joinGroup(currentUser, displayName, groupID, navigation)
          }
        >
          <Text> 参加する </Text>
        </Button>
        <Button
          transparent
          onPress={(): void =>
            navigation.navigate('Auth', { screen: 'CreateGroup' })
          }
        >
          <Text>新しくグループを作成しますか？</Text>
        </Button>
      </Form>
    </Content>
  )
}

export default JoinGroupForm
