import {
  Body,
  CheckBox,
  Form,
  Input,
  Item,
  Label,
  ListItem,
  Text,
  Textarea,
} from 'native-base'
import React from 'react'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'
import { PaymentType } from '../../../repository/firebase/payments/payment-types'

type PaymentForm = {
  payment: PaymentType
  disabled: boolean
}

const PaymentListDetailForm: React.FC<PaymentForm> = ({
  payment,
  disabled,
}: PaymentForm) => (
  <Form style={{ marginRight: 16 }}>
    <Item fixedLabel>
      <Label>日付：</Label>
      <Input
        disabled={disabled}
        value={timestampToLocaleDate(payment.purchaseDate, 'ja-JP', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          weekday: 'short',
        })}
        style={{ textAlign: 'right', lineHeight: 18 }}
      />
    </Item>
    <Item fixedLabel>
      <Label>店舗：</Label>
      <Input
        disabled={disabled}
        value={payment.shopName}
        style={{ textAlign: 'right', lineHeight: 18 }}
      />
    </Item>
    <Item fixedLabel>
      <Label>用途：</Label>
      <Input
        disabled={disabled}
        value={payment.usage}
        style={{ textAlign: 'right', lineHeight: 18 }}
      />
    </Item>
    <Item fixedLabel>
      <Label>負担額：</Label>
      <Input
        disabled={disabled}
        style={{ textAlign: 'right', lineHeight: 18 }}
      />
      <Text
        style={{
          color: '#575757',
          paddingRight: 5,
          fontSize: 17,
        }}
      >
        {payment.groupAmount} 円
      </Text>
    </Item>
    <Item fixedLabel>
      <Label>個人用：</Label>
      <Input
        disabled={disabled}
        style={{ textAlign: 'right', lineHeight: 18 }}
      />
      <Text style={{ color: '#575757', paddingRight: 5, fontSize: 17 }}>
        {payment.privateAmount} 円
      </Text>
    </Item>
    <Textarea
      disabled={disabled}
      rowSpan={3}
      bordered
      underline
      style={{
        marginLeft: 16,
        backgroundColor: '#f8fbfd',
      }}
      value={payment.purchaseMemo}
    />
    <ListItem>
      <CheckBox
        checked={payment.collected}
        color="green"
        style={{ marginRight: 16 }}
      />
      <Body>
        <Text>家計費から徴収済み</Text>
      </Body>
    </ListItem>
  </Form>
)

export default PaymentListDetailForm