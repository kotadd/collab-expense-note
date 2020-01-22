import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Input,
  Item,
  Label,
  Toast
} from 'native-base';
import React, { Component } from 'react';
import { Platform, Text } from 'react-native';
import { connect } from 'react-redux';
import { createPaymentsData } from '../../../firebase/firebase.utils';
import DatePicker from '../../components/datepicker/datepicker-component';
import NativeHeader from '../../components/native-header/native-header.component';
import PickerInput from '../../components/picker-input/picker-input.component';
import OPTIONS from '../../components/picker-input/picker-options';
import { IStateToProps, Props } from '../types';

class ModalScreen extends Component<Props> {
  dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weeday: 'long'
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: '月ごとの支出',
      headerRight: () => (
        <Button title='＋' onPress={() => navigation.navigate('CreateNew')} />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      groupAmount: 0,
      show: false,
      shopName: '',
      userAmount: 0,
      usage: ''
    };
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date: date
    });
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  changeShop = value => {
    this.setState({ shopName: value, show: false });
  };

  changeUsage = value => {
    this.setState({ usage: value, show: false });
  };

  handleSubmit = async () => {
    try {
      let paymentData = await createPaymentsData(
        this.props.currentUser,
        this.state
      );
      if (paymentData) {
        Toast.show({
          text: 'データが作成されました',
          type: 'success'
        });
        this.props.navigation.goBack();
      }
    } catch (e) {
      console.log(`failed to create data: ${e}`);
    }
  };

  render() {
    return (
      <Container>
        <NativeHeader navigation={this.props.navigation} />
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>　日付：</Label>
              <Button transparent onPress={() => this.setState({ show: true })}>
                <Text>
                  {this.state.date.toLocaleDateString('ja-JP', this.dateOption)}
                </Text>
              </Button>
            </Item>

            {this.state.show && (
              <DatePicker value={this.state.date} onChange={this.setDate} />
            )}
            <PickerInput
              key='shop'
              title='　店舗'
              placeholder='購入したお店を選択して下さい'
              items={OPTIONS.SHOP_OPTIONS}
              onChange={this.changeShop.bind(this)}
            />
            <PickerInput
              key='usage'
              title='　用途'
              placeholder='購入した用途を選択して下さい'
              items={OPTIONS.SITUATION_OPTIONS}
              onChange={this.changeUsage.bind(this)}
            />
            <Item fixedLabel>
              <Label>　金額：</Label>
              <Input
                keyboardType='numeric'
                maxLength={6}
                style={{ textAlign: 'right' }}
                onChangeText={text =>
                  this.setState({ groupAmount: parseInt(text), show: false })
                }
              />
              <Label style={{ textAlign: 'right' }}>円</Label>
            </Item>
            <Item fixedLabel last>
              <Label>本人分：</Label>
              <Input
                keyboardType='numeric'
                maxLength={6}
                style={{ textAlign: 'right' }}
                onChangeText={text =>
                  this.setState({ userAmount: parseInt(text), show: false })
                }
              />
              <Label style={{ textAlign: 'right' }}>円</Label>
            </Item>

            <Grid>
              <Col style={{ height: 40 }}></Col>
            </Grid>
            <Button block onPress={this.handleSubmit.bind(this)}>
              <Text>確定する</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(ModalScreen);
