import { Container } from 'native-base'
import React from 'react'
import AddInfoForm from '../../components/add-info-form/add-info-form.component'
import { NavigationProps } from '../../redux/types'

const AddInfoScreen = ({ navigation }: NavigationProps) => {
  return (
    <Container>
      <AddInfoForm navigation={navigation} />
    </Container>
  )
}

export default AddInfoScreen
