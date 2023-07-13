import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MapView, { Circle, Marker, type Region } from 'react-native-maps'
import { type MapPressEvent } from 'react-native-maps/lib/MapView.types'

import { FontAwesome5 } from '@expo/vector-icons'

import {
  getCurrentPositionAsync,
  type LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location'
import { Colors } from '../utils/Colors'
import { useNavigation } from '@react-navigation/native'
import { type CircleType, type MarkerType } from '../types/MapTypes'

const latitudeDelta = 0.003211034107542865
const longitudeDelta = 0.0016659870743751526

export default function Map (): JSX.Element {
  const [userLocation, setUserLocation] = useState<MarkerType>({
    latitude: 0,
    longitude: 0
  })
  const [location, setLocation] = useState<MarkerType>({
    latitude: 0,
    longitude: 0
  })

  const [markers, setMarkers] = useState<MarkerType[]>([])
  const [markersInsideCircle, setMarkersInsideCircle] = useState<MarkerType[]>(
    []
  )

  const navigation = useNavigation<any>()

  /* const latitudeDelta = 0.0016046847791288954
  const longitudeDelta = 0.0008324906229972839 */

  const mapRef = useRef<MapView>(null)

  async function requestLocationPermission (): Promise<LocationObject | null> {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()
      setUserLocation({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude
      })

      console.log('localizacao: ', currentPosition)
      return currentPosition
    }

    return null
  }

  useLayoutEffect(() => {
    requestLocationPermission()
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1
      },
      (response: LocationObject) => {
        console.log('nova pos: ', response)
        setLocation({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude
        })
        mapRef.current?.animateCamera({
          center: response.coords
        })
      }
    )
      .catch((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function handleMapPress (e: MapPressEvent): void {
    console.log('ADS')
    console.log(e.nativeEvent)
    console.log(e.nativeEvent.coordinate)

    const coordinates = e.nativeEvent.coordinate

    // setNewLocation(coordinates)

    setMarkers((oldState) => {
      return [
        ...oldState,
        { latitude: coordinates.latitude, longitude: coordinates.longitude }
      ]
    })

    setNewLocation(coordinates)
  }

  function handleRegionChange (e: Region): void {
    console.log('mudou: ', e)
  }

  function isMarkerInsideCircle (
    marker: MarkerType,
    circle: CircleType
  ): boolean {
    const R = 6371 // raio médio da Terra em quilômetros
    const lat1 = marker.latitude
    const lon1 = marker.longitude
    const lat2 = circle.center.latitude
    const lon2 = circle.center.longitude

    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c

    return distance <= circle.radius
  }

  function toRad (value: number): number {
    return (value * Math.PI) / 180
  }

  const handleRegionChangeComplete = (region: Region): void => {
    console.log('Trigou')
    const circle = {
      center: {
        latitude: location?.latitude ?? 0,
        longitude: location?.longitude ?? 0
      },
      radius: 0.1 // raio do círculo em quilômetros
    }

    setNewLocation(region)

    const markersInside = markers.filter((marker) =>
      isMarkerInsideCircle(marker, circle)
    )

    setMarkersInsideCircle(markersInside)
  }

  function setNewLocation (coordinates: MarkerType): void {
    setLocation((oldState: MarkerType) => {
      const oldLocation = { ...oldState }
      oldLocation.latitude = coordinates.latitude
      oldLocation.longitude = coordinates.longitude
      return oldLocation
    })
  }

  function handlePetInfoModalOpen (): void {
    navigation.navigate('PetInfo')
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        onPress={(e) => {
          handleMapPress(e)
        }}
        initialRegion={{
          latitude: userLocation?.latitude ?? 0,
          longitude: userLocation?.longitude ?? 0,
          latitudeDelta,
          longitudeDelta
        }}
        region={{
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          latitudeDelta,
          longitudeDelta
        }}
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete}
        zoomControlEnabled={true}
        style={styles.container}
      >
        <Circle
          center={{
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0
          }}
          radius={100}
          fillColor="#62ff9930"
          strokeColor="#62ff99"
        />
        <Marker
          coordinate={{
            latitude: userLocation?.latitude ?? 0,
            longitude: userLocation?.longitude ?? 0
          }}
        />
        {/* {markers.map((marker) => (
          <Marker
            key={marker.latitude + marker.longitude}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          />
        ))} */}
        {markersInsideCircle.map((marker, index) => (
          <Marker
            key={index + marker.latitude}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            onPress={handlePetInfoModalOpen}
          >
            <FontAwesome5 name="dog" size={35} color={Colors.primaryPurple} />
            {/* <FontAwesome5 name="cat" size={35} color={Colors.primaryPurple} /> */}
          </Marker>
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
