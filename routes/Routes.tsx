import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from '../utils/Colors'
import TabNavigator from './TabNavigator'
import Map from '../screens/Map'
import PetInfo from '../screens/PetInfo'
import FindAPetScreen from '../screens/FindAPetScreen'

const Stack = createNativeStackNavigator()

export default function Routes (): JSX.Element {
  return (
    <>
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName="BottomTabs"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: Colors.primaryPurple },
          headerTitleAlign: 'center'
        }}

      >
        <Stack.Screen
          name="BottomTabs"
          component={TabNavigator}
          options={
            {
              headerShown: false,
              contentStyle: { backgroundColor: 'red' }
            }
          }
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={
            {
              // contentStyle: { backgroundColor: 'red' }
            }
          }
        />
        <Stack.Screen
          name="PetInfo"
          component={PetInfo}
          options={
            {
              headerTitle: 'Informações do Pet'
            }
          }
        />
        <Stack.Screen
          name="FindAPet"
          component={FindAPetScreen}
          options={
            {
              headerTitle: 'Buscar um pet'
            }
          }
        />
      </Stack.Navigator>

    </NavigationContainer>
    </>
  )
}
