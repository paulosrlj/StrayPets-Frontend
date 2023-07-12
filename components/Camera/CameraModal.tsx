import React, { useRef, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import GenericModal from '../Modal/GenericModal'

import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import Spinner from 'react-native-loading-spinner-overlay'
import { Colors } from '../../utils/Colors'

interface Props {
  cameraRef: React.RefObject<Camera>
  isProcessingImage: boolean
  takePicture: () => void
  setCameraOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CameraModal ({
  cameraRef,
  isProcessingImage,
  takePicture,
  setCameraOpen
}: Props): JSX.Element {
  const [type, setType] = useState(CameraType.back)
  const [flash, setFlash] = useState(FlashMode.off)

  return (
    <GenericModal>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        ratio="16:9"
      >
        <Spinner
          visible={isProcessingImage}
          textContent={'Processando a foto...'}
          textStyle={{ color: 'white' }}
          animation="slide"
          color="white"
          size={50}
        />
        <Pressable
          style={({ pressed }) => [
            styles.cameraClose,
            pressed ? styles.pressed : null
          ]}
          onPress={() => {
            setCameraOpen(false)
          }}
        >
          <Ionicons
            name="close"
            size={35}
            color={'white'}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.cameraButton,
            pressed ? styles.pressed : null
          ]}
          onPress={takePicture}
        >
          <MaterialIcons
            name="camera"
            size={60}
            color={'white'}
          />
        </Pressable>
      </Camera>
    </GenericModal>
  )
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }]
  },
  camera: {
    flex: 1
  },
  cameraClose: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primaryPurple,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '2%',
    right: '5%'
  },
  imageClose: {
    width: 30,
    height: 30,
    backgroundColor: Colors.primaryPurple,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '2%',
    right: '0%',
    zIndex: 999
  },
  cameraButton: {
    width: 70,
    height: 70,
    backgroundColor: Colors.primaryPurple,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '10%',
    left: '42%'
  }
})
