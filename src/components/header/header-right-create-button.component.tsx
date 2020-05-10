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
    title="記録する"
    onPress={(): void =>
      navigation.navigate('HomeTabs', {
        screen: 'Home',
        params: {
          screen: 'Modal',
          params: {
            screen: 'CreateNew',
            params: {
              from,
            },
          },
        },
      })
    }
  />
)

export default HeaderRightCreateButton
