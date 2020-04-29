import { useNavigation } from '@react-navigation/native'
import { Container } from 'native-base'
import React from 'react'
import { useSelector } from 'react-redux'
import { MainScreenNavigationProp } from '../../../AppContainer'
import AddInfoForm from '../../components/add-info-form/add-info-form.component'
import { currentUserSelector } from '../../redux/user/user.selector'

const AddInfoScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>()
  const currentUser = useSelector(currentUserSelector)

  return (
    <Container>
      <AddInfoForm navigation={navigation} currentUser={currentUser} />
    </Container>
  )
}

export default AddInfoScreen
