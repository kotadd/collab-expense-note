import * as React from 'react'
import { Button } from 'react-native'
import { AuthScreenNavigationProp } from '../../../AppContainer'
import { logOut } from '../../utils/navigation.utils'

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
