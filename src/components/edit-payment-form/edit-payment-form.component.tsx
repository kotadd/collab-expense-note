import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
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
  ModalStackParamList,
} from '../../../AppContainer'
import { editPaymentsData } from '../../../repository/firebase/payments/payment-repository'
import { ModalProps } from '../../../repository/firebase/payments/payment-types'
import { currentUserSelector } from '../../redux/user/user.selector'
import DatePicker from '../datepicker/datepicker-component'
import PickerInput from '../picker-input/picker-input.component'
import OPTIONS from '../picker-input/picker-options'

type EditScreenRouteProp = RouteProp<ModalStackParamList, 'Edit'>

const EditPaymentForm: React.FC = () => {
  const currentUser = useSelector(currentUserSelector)
  const route = useRoute<EditScreenRouteProp>()
  const { payment, paymentID } = route.params

  const dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }

  const [collected, setCollected] = useState(payment.collected)
  const [purchaseDate, setPurchaseDate] = useState(
    payment.purchaseDate.toDate()
  )
  const [groupAmount, setGroupAmount] = useState(payment.groupAmount)
  const [purchaseMemo, setPurchaseMemo] = useState(payment.purchaseMemo)
  const [show, setShow] = useState(false)
  const [shopName, setShopName] = useState(payment.shopName)

  const [privateAmount, setPrivateAmount] = useState(payment.privateAmount)
  const [usage, setUsage] = useState(payment.usage)

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
      const paymentData = await editPaymentsData(currentUser, state, paymentID)
      if (paymentData) {
        Toast.show({
          text: 'データが更新されました',
          type: 'success',
        })

        navigation.navigate('Daily', {
          yearMonth: purchaseDate
            .toLocaleDateString('ja-JP', dateOption)
            .replace(/(\d\d|\d)日.*/, ''),
          updatedAt: new Date().toString(),
        })
      } else {
        Toast.show({
          text: 'データの更新に失敗しました',
          type: 'danger',
        })
        navigation.goBack()
      }
    } catch (e) {
      console.log(`failed to edit data: ${e}`)
    }
  }

  const displayDate = purchaseDate

  return (
    <Form style={{ marginRight: 16 }}>
      <Item fixedLabel>
        <Label>日付：</Label>
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
        item={shopName}
        onChange={changeShop}
      />
      <PickerInput
        key="usage"
        title="用途"
        placeholder="購入した用途を選択して下さい"
        items={OPTIONS.SITUATION_OPTIONS}
        item={usage}
        onChange={changeUsage}
      />
      <Item fixedLabel>
        <Label>負担額：</Label>
        <Input
          keyboardType="numeric"
          maxLength={6}
          style={{ textAlign: 'right', lineHeight: 18, marginRight: 10 }}
          value={groupAmount.toString()}
          onChangeText={(text): void => {
            setGroupAmount(parseInt(text) | 0)
          }}
          onFocus={() => setShow(false)}
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
        <Label>個人用：</Label>
        <Input
          keyboardType="numeric"
          maxLength={6}
          style={{ textAlign: 'right', lineHeight: 18, marginRight: 10 }}
          value={privateAmount.toString()}
          onChangeText={(text): void => {
            setPrivateAmount(parseInt(text) | 0)
          }}
          onFocus={() => setShow(false)}
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
        value={purchaseMemo}
        style={{
          marginLeft: 16,
          backgroundColor: '#f8fbfd',
        }}
        onFocus={() => setShow(false)}
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

export default EditPaymentForm
