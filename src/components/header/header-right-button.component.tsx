import * as React from 'react'
import { Button } from 'react-native'
import { CreateNewScreenNavigationProp } from '../../../AppContainer'

type CreateNewProps = {
  navigation: CreateNewScreenNavigationProp
}

const HeaderRightButton: React.FC<CreateNewProps> = ({
  navigation,
}: CreateNewProps) => (
  <Button
    title="➕"
    onPress={(): void =>
      navigation.navigate('CreateNew', {
        from: 'monthly',
      })
    }
  />
)

export default HeaderRightButton
