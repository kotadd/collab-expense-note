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
  Picker,
  Text,
  Toast
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { MainScreenNavigationProp } from '../../../AppContainer'
import { fetchAllGroupData } from '../../../repository/firebase/firebase.utils'
import { addUserProfileDocument } from '../../../repository/firebase/users/user-repository'
import { UserAuthType } from '../../../repository/firebase/users/user-types'

type AddInfoProps = {
  navigation: MainScreenNavigationProp
  currentUser: UserAuthType
}

const AddInfoForm: React.FC<AddInfoProps> = ({
  navigation,
  currentUser
}: AddInfoProps) => {
  const [name, setName] = useState('')
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [pickerItemDom, setPickerItemDom] = useState([] as JSX.Element[])

  useEffect(() => {
    type GroupsType = {
      [key: string]: string
    }

    const fetchGroups: () => Promise<void> = async () => {
      const groupCollectionSnapshot = await fetchAllGroupData()
      if (!groupCollectionSnapshot) return
      const groups = {} as GroupsType

      groupCollectionSnapshot.forEach(doc => {
        groups[doc.id] = doc.data().name
      })

      if (!groups) return

      const tempDom = []

      for (const key in await groups) {
        tempDom.push(<Picker.Item label={groups[key]} value={key} key={key} />)
      }

      setPickerItemDom(tempDom)

      return
    }

    fetchGroups()
  }, [])

  const joinGroup: (groupId: string) => void = groupId => {
    setSelectedGroupId(groupId)
  }

  const addGroupInfo: (name: string, selectedGroupId: string) => void = async (
    name,
    selectedGroupId
  ) => {
    try {
      const result = await addUserProfileDocument(
        currentUser,
        selectedGroupId,
        name
      )

      if (!result) {
        return Toast.show({
          text: 'ユーザー情報が不明です',
          type: 'danger'
        })
      }
      navigation.navigate('Main')
    } catch (error) {
      return Toast.show({
        text: 'ユーザーの情報を追加するのに失敗しました。',
        type: 'danger'
      })
    }
  }

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon type="FontAwesome" active name="user" />
          <Label>表示するあなたの名前を入力してください</Label>
          <Input
            defaultValue=""
            onChangeText={(text): void => setName(text)}
            value={name}
          />
        </Item>
        <Item picker>
          <Icon
            type="FontAwesome"
            active
            name="users"
            style={{ marginLeft: 16 }}
          />
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            placeholder="参加するグループを選択してください"
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={selectedGroupId}
            onValueChange={(groupId: string): void => joinGroup(groupId)}
          >
            {pickerItemDom}
          </Picker>
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button
          block
          dark
          onPress={(): void => addGroupInfo(name, selectedGroupId)}
        >
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  )
}

export default AddInfoForm
