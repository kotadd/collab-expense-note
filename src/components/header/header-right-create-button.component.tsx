import * as React from 'react'
import { Button } from 'react-native'
import { RootScreenNavigationProp } from '../../../AppContainer'

type CreateNewProps = {
  navigation: RootScreenNavigationProp
  from: 'monthly' | 'daily'
}

const HeaderRightCreateButton: React.FC<CreateNewProps> = ({
  navigation,
  from,
}: CreateNewProps) => (
  <Button
    title="➕"
    onPress={(): void =>
      navigation.navigate('Modal', {
        screen: 'CreateNew',
        params: {
          from,
        },
      })
    }
  />
)

export default HeaderRightCreateButton
