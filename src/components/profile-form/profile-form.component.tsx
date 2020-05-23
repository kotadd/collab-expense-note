import { Form, Icon, Input, Item, Label, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchGroupIDByUID } from '../../../repository/firebase/firebase.utils'
import {
  currentGroupIDSelector,
  currentUserSelector,
} from '../../redux/user/user.selector'
import { Clipboard } from 'react-native'

const copyToClipboard = (groupID: string): void => {
  Clipboard.setString(groupID)
  Toast.show({
    text: 'コピーしました',
  })
}

const ProfileForm: React.FC = () => {
  const [groupID, setGroupID] = useState('')
  const currentUser = useSelector(currentUserSelector)
  const currentGroupID = useSelector(currentGroupIDSelector)

  useEffect(() => {
    const fetchGroupID: () => Promise<void> = async () => {
      const groupID = currentGroupID
        ? currentGroupID
        : await fetchGroupIDByUID(currentUser.uid)
      setGroupID(groupID)
    }
    fetchGroupID()
  }, [currentUser.uid, currentGroupID])

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
      <Item fixedLabel onPress={(): void => copyToClipboard(groupID)}>
        <Label>グループID</Label>
        <Input value={groupID} disabled={true} />
        <Icon type="FontAwesome" active name="clipboard" />
      </Item>
    </Form>
  )
}

export default ProfileForm
