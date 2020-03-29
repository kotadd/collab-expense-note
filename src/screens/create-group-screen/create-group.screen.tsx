import { Container } from 'native-base'
import React from 'react'
import CreateGroupForm from '../../components/create-group-form/create-group-form.component'

const CreateGroupScreen: React.FC = () => {
  return (
    <Container>
      <CreateGroupForm />
    </Container>
  )
}

export default CreateGroupScreen
