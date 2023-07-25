import React, { useCallback, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location'
import Toast from 'react-native-root-toast'
import PermissionError from '../errors/PermissionError'
import { Colors } from '../utils/Colors'
import { alertToast } from '../utils/toastConfig'

export default function Home (): JSX.Element {
  const navigator = useNavigation<any>()

  /* const requestLocationPermission =
  useCallback(async (): Promise<void> => {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()

      if (currentPosition === null) {
        throw new PermissionError('Ocorreu um erro ao obter a posição.')
      }
    }
  }, [])

  useEffect(() => {
    requestLocationPermission()
      .catch(error => {
        Toast.show(error.message, alertToast)
      })
  }, [requestLocationPermission]) */

  function handleNavigation (screen: string): void {
    navigator.navigate(screen)
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Pressable
          style={({ pressed }) => [styles.box, pressed && styles.pressedBox]}
          onPress={() => {
            handleNavigation('Map')
          }}
        >
          <FontAwesome5 name="map" size={50} color="white" />
          <Text style={styles.boxText}>Navegar pelo mapa</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.box, pressed && styles.pressedBox]}
          onPress={() => {
            handleNavigation('FindAPet')
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={50} color="white" />
          <Text style={styles.boxText}>Buscar um Pet</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.box, pressed && styles.pressedBox]}
          onPress={() => {
            handleNavigation('PetRegister')
          }}
        >
          <MaterialIcons name="pets" size={50} color="white" />
          <Text style={styles.boxText}>Cadastrar um Pet</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.box, pressed && styles.pressedBox]}
          onPress={() => {
            handleNavigation('MissingPets')
          }}
        >
          <FontAwesome5 name="question" size={50} color="white" />
          <Text style={styles.boxText}>Buscar animais desaparecidos</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    /* flex: 1 */
    // backgroundColor: Colors.primaryPurple
    // backgroundColor: 'red'
  },
  innerContainer: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
    // alignContent: 'space-around',
  },
  box: {
    marginHorizontal: 10,
    marginVertical: 30,
    width: 180,
    height: 300,
    backgroundColor: Colors.primaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  boxText: {
    marginTop: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  pressedBox: {
    transform: [{ scale: 0.95 }]
  }
})
