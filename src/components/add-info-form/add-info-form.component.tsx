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
} from 'native-base'
import React, { useEffect, useState } from 'react'
import {
  MainScreenNavigationProp,
  RootScreenNavigationProp,
} from '../../../AppContainer'
import { fetchAllGroupData } from '../../../repository/firebase/groups/group-repository'
import { addGroupInfo } from './add-info-form.utils'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../redux/user/user.selector'

const AddInfoForm: React.FC = () => {
  const navigation = useNavigation<RootScreenNavigationProp>()
  const currentUser = useSelector(currentUserSelector)

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

      groupCollectionSnapshot.forEach((doc) => {
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
            style={{ width: undefined, marginLeft: -16 }}
            placeholder="参加するグループを選択してください"
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={selectedGroupId}
            onValueChange={(groupId: string): void =>
              setSelectedGroupId(groupId)
            }
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
          onPress={(): void =>
            addGroupInfo(name, selectedGroupId, currentUser, navigation)
          }
        >
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  )
}

export default AddInfoForm
