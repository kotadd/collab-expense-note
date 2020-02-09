import {
  Body,
  Button,
  CheckBox,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Input,
  Item,
  Label,
  ListItem,
  Textarea,
  Toast
} from 'native-base'
import React, { useState } from 'react'
import { Platform, Text } from 'react-native'
import { connect, useDispatch } from 'react-redux'
import { createPaymentsData } from '../../../firebase/firebase.utils'
import DatePicker from '../../components/datepicker/datepicker-component'
import NativeHeader from '../../components/native-header/native-header.component'
import PickerInput from '../../components/picker-input/picker-input.component'
import OPTIONS from '../../components/picker-input/picker-options'
import { updateIsPaymentsUpdated } from '../../redux/account/account.actions'
import { CreatePaymentType, INavProps, UserReduxTypes } from '../types'

const ModalScreen = ({
  navigation,
  currentUser
}: INavProps & UserReduxTypes) => {
  const dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  const [collected, setCollected] = useState(false)
  const [date, setDate] = useState(new Date())
  const [groupAmount, setGroupAmount] = useState(0)
  const [purchaseMemo, setPurchaseMemo] = useState('')
  const [show, setShow] = useState(false)
  const [shopName, setShopName] = useState('')
  const [userAmount, setUserAmount] = useState(0)
  const [usage, setUsage] = useState('')

  const dispatch = useDispatch()

  const setPurchaseDate = (event: Event, selectedDate: Date) => {
    setShow(Platform.OS === 'ios' ? true : false)
    setDate(selectedDate || date)
  }

  const changeShop = (value: string) => {
    setShopName(value)
    setShow(false)
  }

  const changeUsage = (value: string) => {
    setUsage(value)
    setShow(false)
  }

  const handleSubmit = async () => {
    const state: CreatePaymentType = {
      collected,
      date,
      groupAmount,
      purchaseMemo,
      shopName,
      usage,
      userAmount
    }

    try {
      const paymentData = await createPaymentsData(currentUser, state)
      if (paymentData) {
        Toast.show({
          text: 'データが作成されました',
          type: 'success'
        })

        dispatch(updateIsPaymentsUpdated())
        navigation.navigate('Home')
      }
    } catch (e) {
      console.log(`failed to create data: ${e}`)
    }
  }

  return (
    <Container>
      <NativeHeader navigation={navigation} />
      <Content>
        <Form style={{ marginRight: 16 }}>
          <Item fixedLabel>
            <Label>日付：</Label>
            <Button transparent onPress={() => setShow(true)}>
              <Text style={{ fontSize: 16 }}>
                {date.toLocaleDateString('ja-JP', dateOption) ||
                  new Date().toLocaleDateString('ja-JP', dateOption)}
              </Text>
            </Button>
          </Item>

          {show && <DatePicker value={date} onChange={setPurchaseDate} />}
          <PickerInput
            key="shop"
            title="店舗"
            placeholder="購入したお店を選択して下さい"
            items={OPTIONS.SHOP_OPTIONS}
            onChange={changeShop.bind(this)}
          />
          <PickerInput
            key="usage"
            title="用途"
            placeholder="購入した用途を選択して下さい"
            items={OPTIONS.SITUATION_OPTIONS}
            onChange={changeUsage.bind(this)}
          />
          <Item fixedLabel>
            <Label>負担額：</Label>
            <Input
              keyboardType="numeric"
              maxLength={6}
              style={{ textAlign: 'right', lineHeight: 18 }}
              onChangeText={text => {
                setGroupAmount(parseInt(text))
                setShow(false)
              }}
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
              keyboardType="numeric"
              maxLength={6}
              style={{ textAlign: 'right', lineHeight: 18 }}
              onChangeText={text => {
                setUserAmount(parseInt(text))
                setShow(false)
              }}
            />
            <Text style={{ color: '#575757', paddingRight: 5, fontSize: 17 }}>
              円
            </Text>
          </Item>
          <Textarea
            onChangeText={text => setPurchaseMemo(text)}
            rowSpan={3}
            bordered
            placeholder="メモ"
            style={{
              marginLeft: 16,
              backgroundColor: '#f8fbfd'
            }}
          />
          <ListItem onPress={() => setCollected(!collected)}>
            <CheckBox
              checked={collected}
              color="green"
              style={{ marginRight: 16 }}
              onPress={() => setCollected(!collected)}
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
            onPress={handleSubmit.bind(this)}
            style={{ marginLeft: 16 }}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>確定する</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

const mapStateToProps = ({ user }: UserReduxTypes) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(ModalScreen)
