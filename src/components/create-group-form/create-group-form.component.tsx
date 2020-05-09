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
  Toast,
} from 'native-base'
import React, { useState } from 'react'
import {
  createGroup,
  isNewGroupName,
} from '../../../repository/firebase/groups/group-repository'

const createNewGroup: (name: string) => void = (name) => {
  isNewGroupName(name)
    ? createGroup(name)
    : Toast.show({
        text: 'このグループ名はすでに登録されています',
        type: 'danger',
      })
}

const CreateGroupForm: React.FC = () => {
  const [name, setName] = useState('')

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
        <Button block dark onPress={(): void => createNewGroup(name)}>
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  )
}

export default CreateGroupForm
