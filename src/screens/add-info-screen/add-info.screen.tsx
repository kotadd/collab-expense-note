import { Container } from 'native-base';
import React from 'react';
import AddInfoForm from '../../components/add-info-form/add-info-form.component';

const AddInfoScreen = ({ navigation }) => {
  return (
    <Container>
      <AddInfoForm navigation={navigation} />
    </Container>
  );
};

AddInfoScreen.navigationOptions = () => ({
  title: '情報の追加'
});

export default AddInfoScreen;
