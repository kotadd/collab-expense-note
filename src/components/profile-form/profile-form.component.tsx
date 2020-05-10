import { Form, Input, Item, Label } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchGroupIDByUID } from '../../../repository/firebase/firebase.utils'
import { currentUserSelector } from '../../redux/user/user.selector'

const ProfileForm: React.FC = () => {
  const [groupID, setGroupID] = useState('')
  const currentUser = useSelector(currentUserSelector)

  useEffect(() => {
    const fetchGroupID: () => Promise<void> = async () => {
      const groupID = await fetchGroupIDByUID(currentUser.uid)
      setGroupID(groupID)
    }
    fetchGroupID()
  }, [currentUser.uid])

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
        <Input value={groupID} disabled={true} />
      </Item>
    </Form>
  )
}

export default ProfileForm
