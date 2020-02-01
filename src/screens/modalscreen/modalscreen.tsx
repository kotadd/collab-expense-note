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
  Toast,
  Textarea,
  ListItem,
  CheckBox,
  Body
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

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      date: new Date(),
      groupAmount: 0,
      show: false,
      shopName: '',
      userAmount: 0,
      usage: '',
      purchaseMemo: ''
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
        // this.props.navigation.goBack();
        const { navigation } = this.props;
        // console.log(
        //   `navigation.state.from: ${JSON.stringify(
        //     navigation.state,
        //     null,
        //     '  '
        //   )}`
        // );

        navigation.navigate('Home', {
          refresh: () => console.log('refreshed')
        });

        // if (navigation.state.params.from === 'monthly') {
        //   navigation.navigate('Home', {
        //     refresh: () => console.log('refreshed')
        //   });
        // } else {
        //   const targetDate = this.state.date.toLocaleDateString(
        //     'ja-JP',
        //     this.dateOption
        //   );
        //   const yearMonth = targetDate.replace(/(\d\d|\d)日/, '');

        //   navigation.navigate('Daily', {
        //     date: yearMonth,
        //     refresh: () => console.log('refreshed')
        //   });
        // }
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
          <Form style={{ marginRight: 16 }}>
            <Item fixedLabel>
              <Label>日付：</Label>
              <Button transparent onPress={() => this.setState({ show: true })}>
                <Text style={{ fontSize: 16 }}>
                  {this.state.date.toLocaleDateString('ja-JP', this.dateOption)}
                </Text>
              </Button>
            </Item>

            {this.state.show && (
              <DatePicker value={this.state.date} onChange={this.setDate} />
            )}
            <PickerInput
              key='shop'
              title='店舗'
              placeholder='購入したお店を選択して下さい'
              items={OPTIONS.SHOP_OPTIONS}
              onChange={this.changeShop.bind(this)}
            />
            <PickerInput
              key='usage'
              title='用途'
              placeholder='購入した用途を選択して下さい'
              items={OPTIONS.SITUATION_OPTIONS}
              onChange={this.changeUsage.bind(this)}
            />
            <Item fixedLabel>
              <Label>負担額：</Label>
              <Input
                keyboardType='numeric'
                maxLength={6}
                style={{ textAlign: 'right', lineHeight: 18 }}
                onChangeText={text =>
                  this.setState({ groupAmount: parseInt(text), show: false })
                }
              />
              <Text
                style={{
                  color: '#575757',
                  paddingRight: 5,
                  fontSize: 17
                }}
              >
                円
              </Text>
            </Item>
            <Item fixedLabel>
              <Label>個人用：</Label>
              <Input
                keyboardType='numeric'
                maxLength={6}
                style={{ textAlign: 'right', lineHeight: 18 }}
                onChangeText={text =>
                  this.setState({ userAmount: parseInt(text), show: false })
                }
              />
              <Text style={{ color: '#575757', paddingRight: 5, fontSize: 17 }}>
                円
              </Text>
            </Item>
            <Textarea
              onChangeText={text => this.setState({ purchaseMemo: text })}
              rowSpan={3}
              bordered
              placeholder='メモ'
              style={{
                marginLeft: 16,
                backgroundColor: '#f8fbfd'
              }}
            />
            <ListItem
              onPress={() => this.setState({ checked: !this.state.checked })}
            >
              <CheckBox
                checked={this.state.checked}
                color='green'
                style={{ marginRight: 16 }}
              />
              <Body>
                <Text>家計費から徴収済み</Text>
              </Body>
            </ListItem>
            <Grid>
              <Col style={{ height: 40 }}></Col>
            </Grid>
            <Button
              block
              onPress={this.handleSubmit.bind(this)}
              style={{ marginLeft: 16 }}
            >
              <Text style={{ color: 'white', fontSize: 16 }}>確定する</Text>
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
