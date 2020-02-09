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
  fetchAllGroupData,
  addUserProfileDocument
} from '../../../firebase/firebase.utils';
import { INavProps } from '../../screens/types';

const AddInfoForm = ({ navigation, currentUser }: INavProps) => {
  const [name, setName] = useState('');
  const [pickerItemDom, setPickerItemDom] = useState([]);

  const [selectedGroupId, setSelectedGroupId] = useState('');

  const onValueChange = (groupId: string) => {
    setSelectedGroupId(groupId);
  };

  useEffect(() => {
    const fetchGroups = async () => {
      const groupCollectionSnapshot = await fetchAllGroupData();
      if (!groupCollectionSnapshot) return;
      let groups = {};
      groupCollectionSnapshot.forEach(doc => {
        groups[doc.id] = doc.data().name;
      });

      if (!groups) return;

      let tempDom = [];

      for (let key in await groups) {
        tempDom.push(<Picker.Item label={groups[key]} value={key} key={key} />);
      }
      return setPickerItemDom(tempDom);
    };

    fetchGroups();
  }, []);

  const addGroupInfo = async (name: string, selectedGroupId) => {
    try {
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
      return Toast.show({
        text: 'ユーザーの情報を追加するのに失敗しました。',
        type: 'danger'
      });
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
            {pickerItemDom}
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
