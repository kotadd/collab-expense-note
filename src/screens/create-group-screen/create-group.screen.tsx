import { Container } from 'native-base'
import React from 'react'
import CreateGroupForm from '../../components/create-group-form/create-agroup-form.component'
import { NavigationProps } from '../types'

const CreateGroupScreen = ({ navigation }: NavigationProps) => {
  return (
    <Container>
      <CreateGroupForm navigation={navigation} />
    </Container>
  )
}

CreateGroupScreen.navigationOptions = () => ({
  title: 'グループの作成'
})

export default CreateGroupScreen
