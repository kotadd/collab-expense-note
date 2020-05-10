import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { RouteProp } from '@react-navigation/native'
import { HomeTabsParamList } from '../../../AppContainer'

type TabBarIconProps = {
  route: RouteProp<HomeTabsParamList, 'Home' | 'Profile'>
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
    iconName = focused
      ? 'ios-information-circle'
      : 'ios-information-circle-outline'
  } else if (route.name === 'Home') {
    iconName = focused ? 'ios-list-box' : 'ios-list'
  }

  return <Ionicons name={iconName} size={size} color={color} />
}

export default TabBarIcons
