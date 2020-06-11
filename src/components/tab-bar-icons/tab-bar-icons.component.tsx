import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import { HomeTabsParamList } from '../../../AppContainer'

type TabBarIconProps = {
  route: RouteProp<HomeTabsParamList, 'Home' | 'Profile' | 'Setting'>
  focused: boolean
  color: string
  size: number
}
const TabBarIcons: React.FC<TabBarIconProps> = ({
  route,
  focused,
  color,
  size,
}: TabBarIconProps) => {
  let iconName = ''

  if (route.name === 'Profile') {
    iconName = focused ? 'information' : 'information-outline'
  } else if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline'
  } else if (route.name === 'Setting') {
    iconName = focused ? 'settings' : 'settings-outline'
  }

  return <MaterialCommunityIcons name={iconName} size={size} color={color} />
}

export default TabBarIcons
