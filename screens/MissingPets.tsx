import React, { useLayoutEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import PetInfoModal from '../components/PetInfo/PetInfoModal'
import useLocationPermission from '../hooks/useLocationPermission'
import { type PetTypeResponse } from '../types/PetTypes'
import { Colors } from '../utils/Colors'
import axiosInstance from '../utils/api/axios'
import { getAddress } from '../utils/api/petsApi'
import { alertToast } from '../utils/toastConfig'
import { getLocation } from '../utils/geolocation'
import PermissionError from '../errors/PermissionError'
import { GeolocationError } from '../errors/GetLocationError'

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
        <Image source={{ uri: image }} style={styles.petImage} />
      </View>
    </Pressable>
  )
}

export default function MissingPets (): JSX.Element {
  const navigation = useNavigation<any>()

  const requestLocationPermission = useLocationPermission()

  const [pets, setPets] = useState<PetTypeResponse[]>()

  const [modalVisible, setModalVisible] = useState(false)

  useLayoutEffect(() => {
    requestLocationPermission()
      .then(async (response) => {
        const { coords } = await getLocation()

        const address = await getAddress(coords.latitude, coords.longitude)

        const { data } = await axiosInstance.get(
          `/api/pet/queryPet?missing=true&cep=${address.cep}`
        )

        setPets(data)
        console.log(data)
      })
      .catch((error) => {
        if (error instanceof PermissionError) {
          Toast.show('Localização não aceita!', alertToast)
        } else if (error instanceof GeolocationError) {
          Toast.show(error.message, alertToast)
        } else {
          Toast.show(error.message, alertToast)
        }
      })
  }, [requestLocationPermission])

  function handleImagePress (id: number): void {
    navigation.navigate('PetInfo', { id })
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <FlatList
          data={pets}
          renderItem={({ item, index }) => (
            <PetBox
              image={item.photos[0].photo_uri}
              onPress={() => {
                handleImagePress(item.id)
              }}
            />
          )}
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
    borderRadius: 5,
    marginHorizontal: 10
  },
  petImages: {
    flexDirection: 'row',
    /*  justifyContent: 'center', */
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
