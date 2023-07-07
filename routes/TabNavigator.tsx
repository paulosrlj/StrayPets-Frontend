import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import { Ionicons } from '@expo/vector-icons'
import Map from '../screens/Map'
import { Colors } from '../utils/Colors'

const Tab = createBottomTabNavigator()

export default function TabNavigator (): JSX.Element {
  return (

    <Tab.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primaryPurple },
      tabBarStyle: {
        backgroundColor: Colors.primaryPurple
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#ababab'
    }}

  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
        )

      }}
    />
    <Tab.Screen
      name="Settings"
      component={Map}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
  )
}
