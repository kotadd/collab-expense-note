import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Body,
  CheckBox,
  Form,
  Input,
  Item,
  Label,
  ListItem,
  Text,
  Textarea
} from 'native-base'
import React from 'react'
import { DetailScreenNavigationProp } from '../../../AppContainer'
import { DetailScreenRouteProp } from '../../screens/payment-list-detail-screen/payment-list-detail-screen'
import { timestampToLocaleDate } from '../../../repository/firebase/firebase.utils'

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}

const PaymentListDetail: React.FC = () => {
  const navigation = useNavigation<DetailScreenNavigationProp>()
  const route = useRoute<DetailScreenRouteProp>()

  const { yearMonth, day, monthlyPayments } = route.params

  navigation.setOptions({ headerTitle: yearMonth + day })

  return (
    <Form style={{ marginRight: 16 }}>
      <Item fixedLabel>
        <Label>日付：</Label>

        <Input
          disabled
          value={'2020年6月6日(土)'}
          style={{ textAlign: 'right', lineHeight: 18 }}
        />
      </Item>
      <Item fixedLabel>
        <Label>店舗：</Label>
        <Input
          disabled
          value={'スーパー'}
          style={{ textAlign: 'right', lineHeight: 18 }}
        />
      </Item>
      <Item fixedLabel>
        <Label>用途：</Label>
        <Input
          disabled
          value={'食費'}
          style={{ textAlign: 'right', lineHeight: 18 }}
        />
      </Item>
      <Item fixedLabel>
        <Label>負担額：</Label>
        <Input disabled style={{ textAlign: 'right', lineHeight: 18 }} />
        <Text
          style={{
            color: '#575757',
            paddingRight: 5,
            fontSize: 17
          }}
        >
          5,000 円
        </Text>
      </Item>
      <Item fixedLabel>
        <Label>個人用：</Label>
        <Input disabled style={{ textAlign: 'right', lineHeight: 18 }} />
        <Text style={{ color: '#575757', paddingRight: 5, fontSize: 17 }}>
          1,000円
        </Text>
      </Item>
      <Textarea
        disabled
        rowSpan={3}
        bordered
        underline
        style={{
          marginLeft: 16,
          backgroundColor: '#f8fbfd'
        }}
        value="ライフで買ったよ"
      />
      <ListItem>
        <CheckBox checked={true} color="green" style={{ marginRight: 16 }} />
        <Body>
          <Text>家計費から徴収済み</Text>
        </Body>
      </ListItem>
    </Form>
  )
}

export default PaymentListDetail
