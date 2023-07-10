import { View, Text, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, {
  type Region,
  type MapPressEvent,
  Marker,
  Circle
} from 'react-native-maps'

import { FontAwesome5 } from '@expo/vector-icons'
import { Colors } from '../../utils/Colors'

interface MapProps {
  handleMapPress: (e: MapPressEvent) => void
  userLocation: {
    latitude: number
    longitude: number
  }
  location: {
    latitude: number
    longitude: number
  }
  handleRegionChangeComplete: (region: Region) => void
  markerModal: {}
}

interface MarkerType {
  latitude: number
  longitude: number
}

interface CircleType {
  center: {
    latitude: number
    longitude: number
  }
  radius: number
}

const latitudeDelta = 0.003211034107542865
const longitudeDelta = 0.0016659870743751526

export default function Map ({
  location,
  userLocation,
  handleMapPress,
  handleRegionChangeComplete
}: MapProps): JSX.Element {
  const mapRef = useRef<MapView>(null)

  const [markersInsideCircle, setMarkersInsideCircle] = useState<MarkerType[]>(
    []
  )

  return (
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
      /* onRegionChange={handleRegionChange} */
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
