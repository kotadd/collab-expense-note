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
import { useSelector, useDispatch } from 'react-redux'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { createNewGroup } from '../../../repository/firebase/groups/group-repository'
import { currentUserSelector } from '../../redux/user/user.selector'
import { SetCurrentGroupIDAction } from '../../redux/user/user.actions'
import { Dispatch } from 'redux'

const CreateGroupForm: React.FC = () => {
  const [groupName, setGroupName] = useState('')
  const [displayName, setDisplayName] = useState('')

  const currentUser = useSelector(currentUserSelector)

  const navigation = useNavigation<RootScreenNavigationProp>()
  const dispatch = useDispatch<Dispatch<SetCurrentGroupIDAction>>()

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
          <Label>作成するグループ名を入力してください</Label>
          <Input
            defaultValue=""
            onChangeText={(text): void => setGroupName(text)}
            value={groupName}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button
          block
          dark
          onPress={(): Promise<void> =>
            createNewGroup(
              currentUser,
              displayName,
              groupName,
              navigation,
              dispatch
            )
          }
        >
          <Text> 登録する </Text>
        </Button>
        <Button
          transparent
          onPress={(): void =>
            navigation.navigate('Auth', { screen: 'JoinGroup' })
          }
        >
          <Text>すでにあるグループに参加しますか？</Text>
        </Button>
      </Form>
    </Content>
  )
}

export default CreateGroupForm
