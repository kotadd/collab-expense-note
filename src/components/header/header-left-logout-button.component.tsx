import * as React from 'react'
import { Button } from 'react-native'
import { RootScreenNavigationProp } from '../../../AppContainer'
import { logOut } from '../../utils/navigation.utils'

type AuthProps = {
  navigation: RootScreenNavigationProp
}

const HeaderLeftLogoutButton: React.FC<AuthProps> = ({
  navigation,
}: AuthProps) => (
  <Button
    title="ログアウト"
    onPress={(): Promise<void> => logOut(navigation)}
  />
)

export default HeaderLeftLogoutButton
