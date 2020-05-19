import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import {
  Body,
  Button,
  CheckBox,
  Col,
  Form,
  Grid,
  Input,
  Item,
  Label,
  ListItem,
  Textarea,
  Toast,
} from 'native-base'
import React, { useState } from 'react'
import { Platform, Text } from 'react-native'
import { useSelector } from 'react-redux'
import {
  MainScreenNavigationProp,
  MainStackParamList,
  ModalStackParamList,
} from '../../../AppContainer'
import { ModalProps } from '../../../repository/firebase/payments/payment-types'
import DatePicker from '../../components/datepicker/datepicker-component'
import PickerInput from '../../components/picker-input/picker-input.component'
import OPTIONS from '../../components/picker-input/picker-options'
import { currentUserSelector } from '../../redux/user/user.selector'
import { createPaymentsData } from '../../../repository/firebase/payments/payment-repository'

type ModalScreenRouteProp = RouteProp<ModalStackParamList, 'CreateNew'>

const CreatePaymentForm: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const route = useRoute<ModalScreenRouteProp>()
  const { from, yearMonth } = route.params

  const dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }

  const [collected, setCollected] = useState(false)
  const [purchaseDate, setPurchaseDate] = useState(new Date())
  const [groupAmount, setGroupAmount] = useState(0)
  const [purchaseMemo, setPurchaseMemo] = useState('')
  const [show, setShow] = useState(false)
  const [shopName, setShopName] = useState('')
  const [privateAmount, setPrivateAmount] = useState(0)
  const [usage, setUsage] = useState('')

  const navigation = useNavigation<MainScreenNavigationProp>()

  const setDate: (event: Event, selectedDate?: Date) => void = (
    event,
    selectedDate
  ) => {
    setShow(Platform.OS === 'ios' ? true : false)
    setPurchaseDate(selectedDate || purchaseDate)
  }

  const changeShop: (value: string) => void = (value) => {
    setShopName(value)
    setShow(false)
  }

  const changeUsage: (value: string) => void = (value) => {
    setUsage(value)
    setShow(false)
  }

  const handleSubmit: () => void = async () => {
    if (groupAmount <= 0) {
      return Toast.show({
        text: '負担額を入力してください',
        type: 'danger',
      })
    }
    const state: ModalProps = {
      collected,
      groupAmount,
      privateAmount,
      purchaseDate,
      purchaseMemo,
      shopName,
      usage,
    }

    try {
      const paymentData = await createPaymentsData(currentUser, state)
      if (paymentData) {
        Toast.show({
          text: 'データが作成されました',
          type: 'success',
        })

        if (from === 'daily' && yearMonth) {
          navigation.navigate('Daily', {
            yearMonth,
          })
        } else {
          navigation.navigate('Monthly')
        }
      }
    } catch (e) {
      console.log(`failed to create data: ${e}`)
    }
  }

  const displayDate = purchaseDate as Date

  return (
    <Form style={{ marginRight: 16 }}>
      <Item fixedLabel>
        <Label>購入日</Label>
        <Button transparent onPress={(): void => setShow(true)}>
          <Text style={{ fontSize: 16 }}>
            {displayDate.toLocaleDateString('ja-JP', dateOption) ||
              new Date().toLocaleDateString('ja-JP', dateOption)}
          </Text>
        </Button>
      </Item>

      {show && <DatePicker value={displayDate} onChange={setDate} />}
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
        <Label>負担額</Label>
        <Input
          keyboardType="numeric"
          maxLength={6}
          style={{ textAlign: 'right', lineHeight: 18, marginRight: 10 }}
          onChangeText={(text): void => {
            setGroupAmount(parseInt(text) | 0)
            setShow(false)
          }}
        />
        <Text
          style={{
            color: '#575757',
            paddingRight: 5,
            fontSize: 17,
          }}
        >
          円
        </Text>
      </Item>
      <Item fixedLabel>
        <Label>個人用</Label>
        <Input
          keyboardType="numeric"
          maxLength={6}
          style={{ textAlign: 'right', lineHeight: 18, marginRight: 10 }}
          onChangeText={(text): void => {
            setPrivateAmount(parseInt(text) | 0)
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
          backgroundColor: '#f8fbfd',
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
  )
}

export default CreatePaymentForm
