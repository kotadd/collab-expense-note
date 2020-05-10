import * as React from 'react'
import { Button } from 'react-native'
import { HomeScreenNavigationProp } from '../../../AppContainer'
import { PaymentType } from '../../../repository/firebase/payments/payment-types'

type EditProps = {
  navigation: HomeScreenNavigationProp
  payment: PaymentType
  paymentID: string
}

const HeaderRightEditButton: React.FC<EditProps> = ({
  navigation,
  payment,
  paymentID,
}: EditProps) => (
  <Button
    title="修正"
    onPress={(): void =>
      navigation.navigate('Modal', {
        screen: 'Edit',
        params: {
          payment,
          paymentID,
        },
      })
    }
  />
)

export default HeaderRightEditButton
