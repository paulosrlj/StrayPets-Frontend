import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, type Region } from 'react-native-maps'
import { type MapPressEvent } from 'react-native-maps/lib/MapView.types'

import Toast from 'react-native-root-toast'

import { useNavigation } from '@react-navigation/native'
import {
  LocationAccuracy,
  watchPositionAsync,
  type LocationObject,
  type LocationSubscription
} from 'expo-location'
import { ApiError } from '../errors/ApiError'
import { GeolocationError } from '../errors/GetLocationError'
import PermissionError from '../errors/PermissionError'
import useLocationPermission from '../hooks/useLocationPermission'
import { type PetTypeResponse } from '../types/PetTypes'
import {
  defaultValues,
  type AddressType,
  type SimpleLocation
} from '../types/geolocationTypes'
import { Colors } from '../utils/Colors'
import { getAddress, getPetsByArea } from '../utils/api/petsApi'
import { getLocation } from '../utils/geolocation'
import { alertToast, apiToast } from '../utils/toastConfig'

const initialLatitudeDelta = 0.003211034107542865
const initialLongitudeDelta = 0.0016659870743751526

const options = {
  accuracy: LocationAccuracy.Highest,
  timeInterval: 5000,
  distanceInterval: 5 // meters
}

interface Props {
  route: any
}

export default function Map ({ route }: Props): JSX.Element {
  const [userLocation, setUserLocation] = useState<SimpleLocation>({
    latitude: 0,
    longitude: 0
  })

  const [location, setLocation] = useState<AddressType>({ ...defaultValues })

  const [inViewLocation, setInViewLocation] = useState<SimpleLocation>({
    latitude: 0,
    longitude: 0
  })

  const watchSubscriptionRef = useRef<LocationSubscription | null | undefined>(
    null
  )

  const [permissionGranted, setPermissionGranted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(false)

  const [pets, setPets] = useState<PetTypeResponse[]>([])

  const navigation = useNavigation<any>()

  const mapRef = useRef<MapView>(null)

  const requestLocationPermission = useLocationPermission()

  const handleRegionChangeComplete = async (region: Region): Promise<void> => {
    setInViewLocation({
      latitude: region.latitude,
      longitude: region.longitude
    })
  }

  useLayoutEffect(() => {
    let latitude: number
    let longitude: number

    if (route?.params !== undefined) {
      latitude = route.params.latitude
      longitude = route.params.longitude
    }

    requestLocationPermission()
      .then(async (isGranted) => {
        setPermissionGranted(true)
        const { coords } = await getLocation()

        const address = await getAddress(coords.latitude, coords.longitude)

        const pets = await getPetsByArea(address.state, address.city)
        setPets(pets)

        setLocation(address)
        setUserLocation(address)
        setInViewLocation({
          latitude: coords.latitude,
          longitude: coords.longitude
        })

        if (latitude && longitude) {
          mapRef.current?.animateCamera({
            center: { latitude, longitude }
          })
        } else {
          mapRef.current?.animateCamera({
            center: coords
          })
        }
        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof PermissionError) {
          Toast.show('Localização não aceita!', alertToast)
        } else if (error instanceof GeolocationError) {
          Toast.show(error.message, alertToast)
        } else {
          Toast.show(error.message, alertToast)
        }

        setHasError(true)
        setLoading(false)
      })
  }, [route, requestLocationPermission])

  useEffect(() => {
    console.log('WATCH_POSITION_ASYNC')

    const onLocationChange = async (
      response: LocationObject
    ): Promise<void> => {
      const lat = response.coords.latitude
      const lon = response.coords.longitude

      setUserLocation({ latitude: lat, longitude: lon })
    }

    watchPositionAsync(options, onLocationChange)
      .then((locationSubscribe) => {
        watchSubscriptionRef.current = locationSubscribe
      })
      .catch((error) => {
        console.error(error.message)
        Toast.show('Ocorreu um erro ao atualizar a sua posição', alertToast)
      })

    return () => {
      if (watchSubscriptionRef.current) {
        watchSubscriptionRef.current.remove()
      }
    }
  }, [])

  async function handleUpdateMap (): Promise<void> {
    setFetching(true)
    try {
      Toast.show('Atualizando...', apiToast)
      const address = await getAddress(
        inViewLocation.latitude,
        inViewLocation.longitude
      )

      const pets = await getPetsByArea(address.state, address.city)

      setPets(pets)
    } catch (error) {
      if (error instanceof ApiError) {
        Toast.show(error.message, alertToast)
      } else {
        Toast.show('Ocorreu um erro ao atualizar os pets', alertToast)
      }
    }

    setFetching(false)
  }

  function handleMapPress (e: MapPressEvent): void {
    const coords = e.nativeEvent.coordinate

    navigation.navigate('PetRegister', { coords })
  }

  function handlePetInfoModalOpen (id: number): void {
    navigation.navigate('PetInfo', { id })
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    )
  }

  if (hasError) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>
            Não foi possível obter as informações da sua posição
          </Text>
        </View>
      </View>
    )
  }

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Permissão não concedida!</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        onPress={(e) => {
          handleMapPress(e)
        }}
        initialRegion={{
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          latitudeDelta: initialLatitudeDelta,
          longitudeDelta: initialLongitudeDelta
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        zoomControlEnabled={true}
        style={styles.container}
      >
        <Marker
          coordinate={{
            latitude: userLocation?.latitude ?? 0,
            longitude: userLocation?.longitude ?? 0
          }}
        />
        {pets.map((pet, index) => (
          <Marker
            key={index + pet.location.latitude}
            coordinate={{
              latitude: pet.location.latitude,
              longitude: pet.location.longitude
            }}
            onPress={() => {
              handlePetInfoModalOpen(pet.id)
            }}
          >
            {pet.type === 'CACHORRO'
              ? (
              <FontAwesome5 name="dog" size={35} color={Colors.primaryPurple} />
                )
              : (
              <FontAwesome5 name="cat" size={35} color={Colors.primaryGreen} />
                )}
          </Marker>
        ))}
      </MapView>

      <Pressable
      disabled={fetching}
        style={({ pressed }) => [
          styles.reloadButton,
          pressed ? styles.pressed : null
        ]}
        onPress={handleUpdateMap}
      >
        <View style={styles.reloadBox}>
          <Ionicons name="reload" size={35} color="black" />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 16
  },
  reloadButton: {
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 6,
    top: '5%',
    right: '1%',
    width: 50,
    height: 50,
    padding: 5,
    backgroundColor: 'rgb(214, 214, 214)'
  },
  reloadBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressed: {
    transform: [{ scale: 0.95 }]
  }
})
