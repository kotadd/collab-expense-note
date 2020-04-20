import { useNavigation } from '@react-navigation/native'
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
import { useDispatch, useSelector } from 'react-redux'
import { CreatePaymentType } from '../../../repository/firebase/accounts/account-types'
import { createPaymentsData } from '../../../repository/firebase/firebase.utils'
import DatePicker from '../../components/datepicker/datepicker-component'
import NativeHeader from '../../components/native-header/native-header.component'
import PickerInput from '../../components/picker-input/picker-input.component'
import OPTIONS from '../../components/picker-input/picker-options'
import { updateIsPaymentsUpdated } from '../../redux/account/account.actions'
import { userSelector } from '../../redux/user/user.selector'
import { HomeScreenNavigationProp } from '../../../AppContainer'
import firebase from 'firebase'

const ModalScreen: React.FC = () => {
  const currentUser = useSelector(userSelector)

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
  const navigation = useNavigation<HomeScreenNavigationProp>()

  const setPurchaseDate: (event: Event, selectedDate: Date) => void = (
    event,
    selectedDate
  ) => {
    setShow(Platform.OS === 'ios' ? true : false)
    setDate(selectedDate || date)
  }

  const changeShop: (value: string) => void = value => {
    setShopName(value)
    setShow(false)
  }

  const changeUsage: (value: string) => void = value => {
    setUsage(value)
    setShow(false)
  }

  const handleSubmit: () => void = async () => {
    const state: CreatePaymentType = {
      _createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      _updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      collected,
      date,
      groupAmount,
      purchaseMemo,
      shopName,
      usage,
      userAmount
    }

    console.log('called')
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
            <Button transparent onPress={(): void => setShow(true)}>
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
            onChange={changeShop}
          />
          <PickerInput
            key="usage"
            title="用途"
            placeholder="購入した用途を選択して下さい"
            items={OPTIONS.SITUATION_OPTIONS}
            onChange={changeUsage}
          />
          <Item fixedLabel>
            <Label>負担額：</Label>
            <Input
              keyboardType="numeric"
              maxLength={6}
              style={{ textAlign: 'right', lineHeight: 18 }}
              onChangeText={(text): void => {
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
              onChangeText={(text): void => {
                setUserAmount(parseInt(text))
                setShow(false)
              }}
            />
            <Text style={{ color: '#575757', paddingRight: 5, fontSize: 17 }}>
              円
            </Text>
          </Item>
          <Textarea
            onChangeText={(text): void => setPurchaseMemo(text)}
            rowSpan={3}
            bordered
            underline
            placeholder="メモ"
            style={{
              marginLeft: 16,
              backgroundColor: '#f8fbfd'
            }}
          />
          <ListItem onPress={(): void => setCollected(!collected)}>
            <CheckBox
              checked={collected}
              color="green"
              style={{ marginRight: 16 }}
              onPress={(): void => setCollected(!collected)}
            />
            <Body>
              <Text>家計費から徴収済み</Text>
            </Body>
          </ListItem>
          <Grid>
            <Col style={{ height: 40 }}></Col>
          </Grid>
          <Button block onPress={handleSubmit} style={{ marginLeft: 16 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>確定する</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  )
}

export default ModalScreen
