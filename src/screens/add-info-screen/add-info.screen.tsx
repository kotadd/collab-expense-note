import { Container } from 'native-base'
import React from 'react'
import AddInfoForm from '../../components/add-info-form/add-info-form.component'
import { INavProps } from '../types'

const AddInfoScreen = ({ navigation }: INavProps) => {
  return (
    <Container>
      <AddInfoForm navigation={navigation} />
    </Container>
  )
}

AddInfoScreen.navigationOptions = () => ({
  title: '情報の追加'
})

export default AddInfoScreen
