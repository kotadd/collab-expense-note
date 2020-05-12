import { Form, Input, Item, Label } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import {
  currentGroupIDSelector,
  currentUserSelector,
} from '../../redux/user/user.selector'

const ProfileForm: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)

  return (
    <Form>
      <Item fixedLabel>
        <Label>表示名</Label>
        <Input value={currentUser.displayName?.toString()} disabled={true} />
      </Item>
      <Item fixedLabel>
        <Label>メールアドレス</Label>
        <Input value={currentUser.email?.toString()} disabled={true} />
      </Item>
      <Item fixedLabel>
        <Label>グループID</Label>
        <Input value={currentGroupID} disabled={true} />
      </Item>
    </Form>
  )
}

export default ProfileForm
