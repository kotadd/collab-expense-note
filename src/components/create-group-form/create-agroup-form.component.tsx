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
  Toast
} from 'native-base'
import React, { useState } from 'react'
import {
  createAccountAndGroup,
  fetchAllGroupData
} from '../../../firebase/firebase.utils'
import { NavigationProps } from '../../screens/types'

const CreateGroupForm = ({ navigation }: NavigationProps) => {
  const [name, setName] = useState('')
  const [isNewGroup, setIsNewGroup] = useState(true)

  const createNewGroup = async (name: string) => {
    try {
      const groups = await fetchAllGroupData()
      groups.forEach(group => {
        if (name === group.data().name) {
          return setIsNewGroup(false)
        }
      })

      if (!isNewGroup) {
        return Toast.show({
          text: 'このグループ名はすでに登録されています',
          type: 'danger'
        })
      }

      return await createAccountAndGroup(name)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon type="FontAwesome" active name="users" />
          <Label>グループ名</Label>
          <Input
            defaultValue=""
            onChangeText={text => setName(text)}
            value={name}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button block dark onPress={() => createNewGroup(name)}>
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  )
}

export default CreateGroupForm
