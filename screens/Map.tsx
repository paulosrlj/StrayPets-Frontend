import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import axios from '../utils/api/axios'

import MapView, { Marker, type Region } from 'react-native-maps'
import { type MapPressEvent } from 'react-native-maps/lib/MapView.types'

import { FontAwesome5 } from '@expo/vector-icons'

import Toast from 'react-native-root-toast'

import { useNavigation } from '@react-navigation/native'
import {
  LocationAccuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  type LocationObject,
  type LocationSubscription
} from 'expo-location'
import PermissionError from '../errors/PermissionError'
import { type PetTypeResponse } from '../types/PetTypes'
import { defaultValues, type AddressType } from '../types/geolocationTypes'
import { Colors } from '../utils/Colors'
import { debounce } from '../utils/debounceFn'

const initialLatitudeDelta = 0.003211034107542865
const initialLongitudeDelta = 0.0016659870743751526

const toastConfig = {
  duration: Toast.durations.LONG,
  position: Toast.positions.BOTTOM,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0
}

const options = {
  accuracy: LocationAccuracy.Highest,
  timeInterval: 10000,
  distanceInterval: 1
}

interface Props {
  route: any
}

export default function Map ({ route }: Props): JSX.Element {
  const [userLocation, setUserLocation] = useState<AddressType | null>({
    ...defaultValues
  })

  const watchSubscriptionRef = useRef<LocationSubscription | null | undefined>(null)

  const [location, setLocation] = useState<AddressType>({ ...defaultValues })

  const [loading, setLoading] = useState(true)

  const [pets, setPets] = useState<PetTypeResponse[]>([])

  const navigation = useNavigation<any>()

  /* const latitudeDelta = 0.0016046847791288954
  const longitudeDelta = 0.0008324906229972839 */

  const mapRef = useRef<MapView>(null)

  const getAddress = useCallback(
    async (latitude: number, longitude: number): Promise<AddressType> => {
      const response = await axios.get(
        `/api/maps?latitude=${latitude}&longitude=${longitude}`
      )
      const data = response.data as AddressType

      return data
    },
    []
  )

  const getPetsByArea = useCallback(
    async (state: string, city: string): Promise<PetTypeResponse[]> => {
      const response = await axios.get(
        `/api/pet/queryPet?state=${state}&city=${city}`
      )
      const data = response.data as PetTypeResponse[]

      return data
    },
    []
  )

  const requestLocationPermission =
    useCallback(async (): Promise<LocationObject> => {
      const { granted } = await requestForegroundPermissionsAsync()

      if (granted) {
        const currentPosition = await getCurrentPositionAsync()

        if (currentPosition === null) {
          throw new PermissionError('Ocorreu um erro ao obter a posição.')
        }

        return currentPosition
      }

      throw new PermissionError('A permissão de localização não foi aceita.')
    }, [])

  const verifyIfAddressChanged = useCallback(
    (address: AddressType): boolean => {
      if (address.city !== location.city) return true
      else if (address.state !== location.state) return true
      else return false
    },
    [location.city, location.state]
  )

  const handleRegionChangeComplete = async (region: Region): Promise<void> => {
    console.log('HANDLE_REGION_CHANGE')
    // Buscar o cep e bairro do novo endereço
    const address = await getAddress(region.latitude, region.longitude)

    if (verifyIfAddressChanged(address)) {
      console.log('ENDEREÇO_MUDOU')
      const pets = await getPetsByArea(address.state, address.city)

      setPets(pets)
    }

    const newLocation: AddressType = {
      ...address,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta
    }
    setLocation(newLocation)
  }

  const handleRegionChangeCompleteDebounced = debounce(
    handleRegionChangeComplete,
    3000
  )

  useLayoutEffect(() => {
    let latitude: number
    let longitude: number

    if (route?.params !== undefined) {
      latitude = route.params.latitude
      longitude = route.params.longitude
    }

    requestLocationPermission()
      .then(async (response) => {
        const address = await getAddress(
          response.coords.latitude,
          response.coords.longitude
        )

        const pets = await getPetsByArea(address.state, address.city)
        setPets(pets)

        setLocation(address)

        if (latitude && longitude) {
          mapRef.current?.animateCamera({
            center: { latitude, longitude }
          })
        } else {
          mapRef.current?.animateCamera({
            center: response.coords
          })
        }

        setLoading(false)
      })
      .catch((error) => {
        if (error instanceof PermissionError) {
          Toast.show(error.message, toastConfig)
        }
        console.error(error)
        Toast.show(error.message, toastConfig)
        setLoading(false)
      })
  }, [getPetsByArea, getAddress, requestLocationPermission, route])

  useEffect(() => {
    console.log('WATCH_POSITION_ASYNC')

    const onLocationChange = async (response: LocationObject): Promise<void> => {
      const lat = response.coords.latitude
      const lon = response.coords.longitude

      const address = await getAddress(lat, lon)

      if (verifyIfAddressChanged(address)) {
        const pets = await getPetsByArea(address.cep, address.sub_location)
        setPets(pets)
      }

      setUserLocation(address)
    }

    watchPositionAsync(options, onLocationChange)
      .then(locationSubscribe => {
        watchSubscriptionRef.current = locationSubscribe
      })
      .catch((error) => {
        console.log(error)
      })

    return () => {
      if (watchSubscriptionRef.current) {
        watchSubscriptionRef.current.remove()
      }
    }
  }, [
    getAddress,
    getPetsByArea,
    verifyIfAddressChanged,
    location.latitudeDelta,
    location.longitudeDelta])

  function handleMapPress (e: MapPressEvent): void {
    const coords = e.nativeEvent.coordinate

    navigation.navigate('PetRegister', { coords })
  }

  function handlePetInfoModalOpen (id: number): void {
    navigation.navigate('PetInfo', { id })
  }

  return (
    <View style={styles.container}>
      {loading
        ? (
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
          )
        : (
        <MapView

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
          onRegionChangeComplete={handleRegionChangeCompleteDebounced}
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
              onPress={() => { handlePetInfoModalOpen(pet.id) }}
            >
              {pet.type === 'CACHORRO'
                ? (
                <FontAwesome5
                  name="dog"
                  size={35}
                  color={Colors.primaryPurple}
                />
                  )
                : (
                <FontAwesome5
                  name="cat"
                  size={35}
                  color={Colors.primaryGreen}
                />
                  )}
            </Marker>
          ))}
        </MapView>
          )}
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
  }
})
