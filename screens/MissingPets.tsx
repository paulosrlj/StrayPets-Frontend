import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync
} from 'expo-location'
import React, { useLayoutEffect, useState } from 'react'
import { Image, StyleSheet, View, Pressable, FlatList } from 'react-native'
import { type MarkerType } from '../types/MapTypes'

import DogImage from './dog.jpg'
import GenericModal from '../components/Modal/GenericModal'
import PetInfo from './PetInfo'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../utils/Colors'
import PetInfoModal from '../components/PetInfo/PetInfoModal'
import { useNavigation } from '@react-navigation/native'

const pets = [
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage,
  DogImage
]

interface PetBoxProps {
  image: any
  onPress: any
}

function PetBox ({ image, onPress }: PetBoxProps): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.pressed : null]}
      onPress={onPress}
    >
      <View style={styles.petBox}>
        <Image source={image} style={styles.petImage} />
      </View>
    </Pressable>
  )
}

export default function MissingPets (): JSX.Element {
  const navigation = useNavigation<any>()

  const [userLocation, setUserLocation] = useState<MarkerType>({
    latitude: 0,
    longitude: 0
  })

  const [modalVisible, setModalVisible] = useState(false)

  async function requestLocationPermission (): Promise<void> {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      setUserLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude
      })

      console.log('localizacao: ', currentPosition)
    }
  }

  useLayoutEffect(() => {
    requestLocationPermission().catch((error) => {
      console.log(error)
    })
  }, [])

  function handleImagePress (): void {
    /* setModalVisible(true) */
    navigation.navigate('PetInfo')
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <FlatList
          data={pets}
          renderItem={({ item, index }) => <PetBox image={item} onPress={handleImagePress} />}
          contentContainerStyle={styles.petImages}
        />

        {modalVisible && (
          <PetInfoModal
            onPressCloseButton={() => {
              setModalVisible(false)
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  petBox: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  petImages: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }]
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'green'
  },
  imageClose: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryRed,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '1%',
    left: '1%',
    zIndex: 999
  }
})
