import { Container } from 'native-base';
import React from 'react';
import CreateGroupForm from '../../components/create-group-form/create-agroup-form.component';

const CreateGroupScreen = ({ navigation }) => {
  return (
    <Container>
      <CreateGroupForm navigation={navigation} />
    </Container>
  );
};

CreateGroupScreen.navigationOptions = () => ({
  title: 'グループの作成'
});

export default CreateGroupScreen;
