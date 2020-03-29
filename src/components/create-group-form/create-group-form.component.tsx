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
} from '../../../repository/firebase/firebase.utils'

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState('')
  const [isNewGroup, setIsNewGroup] = useState(true)

  const createNewGroup: (name: string) => Promise<void | null> = async name => {
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
            onChangeText={(text): void => setName(text)}
            value={name}
          />
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button
          block
          dark
          onPress={(): Promise<void | null> => createNewGroup(name)}
        >
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  )
}

export default CreateGroupForm
