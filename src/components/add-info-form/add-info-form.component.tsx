import {
  Button,
  Col,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Text,
  Toast
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchGroupData,
  addUserProfileDocument
} from '../../../firebase/firebase.utils';
import { IStateToProps } from '../../screens/types';

const AddInfoForm = ({ navigation, currentUser }) => {
  const [name, setName] = useState('');
  const [groups, setGroups] = useState({});

  const [selectedGroupId, setSelectedGroupId] = useState('');

  const onValueChange = (groupId: string) => {
    // console.log(groupId);
    setSelectedGroupId(groupId);
  };

  useEffect(() => {
    async function fetchData() {
      const groupCollectionSnapshot = await fetchGroupData();
      groupCollectionSnapshot.forEach(doc => {
        setGroups({ [doc.id]: doc.data().name });
      });
    }
    fetchData();
  }, []);

  function pickerItems(groups) {
    let pickerItemDom = [];
    for (let key in groups) {
      pickerItemDom.push(<Picker.Item label={groups[key]} value={key} />);
    }
    // console.log(`groups: ${JSON.stringify(groups, null, '  ')}`);
    return pickerItemDom[0];
  }

  const addGroupInfo = async (name, selectedGroupId) => {
    try {
      // console.log(`name: ${name}`);
      // console.log(`selectedGroupId: ${selectedGroupId}`);
      console.log(`currentUser: ${currentUser}`);
      const result = await addUserProfileDocument(
        currentUser,
        selectedGroupId,
        name
      );

      if (!result) {
        return Toast.show({
          text: 'ユーザー情報が不明です',
          type: 'danger'
        });
      }
      navigation.navigate('App');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Content>
      <Form>
        <Item floatingLabel>
          <Icon type='FontAwesome' active name='user' />
          <Label>表示名</Label>
          <Input
            defaultValue=''
            onChangeText={text => setName(text)}
            value={name}
          />
        </Item>
        <Item picker>
          <Icon
            type='FontAwesome'
            active
            name='users'
            style={{ marginLeft: 16 }}
          />
          <Picker
            mode='dropdown'
            style={{ width: undefined }}
            placeholder='グループ名'
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor='#007aff'
            selectedValue={selectedGroupId}
            onValueChange={onValueChange.bind(this)}
          >
            {pickerItems(groups)}
          </Picker>
        </Item>
        <Grid>
          <Col style={{ height: 40 }}></Col>
        </Grid>
        <Button block dark onPress={() => addGroupInfo(name, selectedGroupId)}>
          <Text> 登録する </Text>
        </Button>
      </Form>
    </Content>
  );
};

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(AddInfoForm);
