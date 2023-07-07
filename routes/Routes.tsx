import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from '../utils/Colors'
import TabNavigator from './TabNavigator'

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
      </Stack.Navigator>

    </NavigationContainer>
    </>
  )
}
