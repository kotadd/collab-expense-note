import * as React from 'react'
import { Button } from 'react-native'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { PaymentType } from '../../../repository/firebase/payments/payment-types'

type EditProps = {
  navigation: RootScreenNavigationProp
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
