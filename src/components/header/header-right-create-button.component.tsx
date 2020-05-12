import * as React from 'react'
import { Button } from 'react-native'
import { RootScreenNavigationProp } from '../../../AppContainer'

type CreateNewProps = {
  navigation: RootScreenNavigationProp
  from: 'monthly' | 'daily'
  yearMonth?: string
}

const HeaderRightCreateButton: React.FC<CreateNewProps> = ({
  navigation,
  from,
  yearMonth,
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
              yearMonth,
            },
          },
        },
      })
    }
  />
)

export default HeaderRightCreateButton
