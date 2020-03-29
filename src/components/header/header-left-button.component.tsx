import * as React from 'react'
import { Button } from 'react-native'
import { logOut } from '../../utils/navigation.utils'
import { AuthScreenNavigationProp } from '../../../AppContainer'

type AuthProps = {
  navigation: AuthScreenNavigationProp
}

const HeaderLeftButton: React.FC<AuthProps> = ({ navigation }: AuthProps) => (
  <Button
    title="ログアウト"
    onPress={(): Promise<void> => logOut(navigation)}
  />
)

export default HeaderLeftButton
