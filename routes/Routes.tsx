import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from '../utils/Colors'
import TabNavigator from './TabNavigator'
import Map from '../screens/Map'
import PetInfo from '../screens/PetInfo'
import FindAPetScreen from '../screens/FindAPetScreen'
import PetRegister from '../screens/PetRegister/PetRegister'
import MissingPets from '../screens/MissingPets'
import PetList from '../screens/PetList'
import LoginScreen from '../screens/LoginScreen'
import { useSelector } from 'react-redux'
import { type RootState } from '../store/store'

const Stack = createNativeStackNavigator()

export default function Routes (): JSX.Element {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomTabs"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: Colors.primaryPurple },
            headerTitleAlign: 'center'
          }}
        >
          {isAuthenticated
            ? (
            <Stack.Screen
              name="BottomTabs"
              component={TabNavigator}
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: 'red' }
              }}
            />
              )
            : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false
              }}
            />
              )}
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerTitle: 'Mapa de pets'
            }}
          />
          <Stack.Screen
            name="PetInfo"
            component={PetInfo}
            options={{
              headerTitle: 'Informações do Pet'
            }}
          />
          <Stack.Screen
            name="FindAPet"
            component={FindAPetScreen}
            options={{
              headerTitle: 'Buscar um pet'
            }}
          />
          <Stack.Screen
            name="PetRegister"
            component={PetRegister}
            options={{
              headerTitle: 'Cadastrar um pet'
            }}
          />

          <Stack.Screen
            name="MissingPets"
            component={MissingPets}
            options={{
              headerTitle: 'Pets desaparecidos'
            }}
          />

          <Stack.Screen
            name="PetList"
            component={PetList}
            options={{
              headerTitle: 'Pets encontrados'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}
