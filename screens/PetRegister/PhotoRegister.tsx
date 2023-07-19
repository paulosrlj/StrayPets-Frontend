import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native'

import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import ImageView from 'react-native-image-viewing'

import { MaterialIcons } from '@expo/vector-icons'

import CameraModal from '../../components/Camera/CameraModal'
import ImageThumbnail from './ImageThumbnail'
import Button from '../../components/Button/Button'
import { Colors } from '../../utils/Colors'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

interface ImageType {
  uri: string
}

export default function PhotoRegister (): JSX.Element {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false)
  const [image, setImage] = useState<string | null>(null)

  const cameraRef = useRef<Camera>(null)
  const [cameraOpen, setCameraOpen] = useState(false)

  const [isGalleryVisible, setIsGalleryVisible] = useState(false)
  const [photoToOpen, setPhotoToOpen] = useState(0)
  const [images, setImages] = useState<ImageType[]>([])

  const [isProcessingImage, setIsProcessingImage] = useState(false)

  useEffect(() => {
    async function requestPermissions (): Promise<void> {
      await MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()

      setHasCameraPermission(cameraStatus.status === 'granted')
    }

    requestPermissions().catch((error) => {
      console.error(error)
    })
  }, [])

  if (hasCameraPermission === null) {
    return (
      <View>
        <Text>Câmera sem permissão</Text>
      </View>
    )
  }

  function openCamera (): void {
    setCameraOpen(true)
  }

  async function takePicture (): Promise<void> {
    setIsProcessingImage(true)

    if (cameraRef === null) return

    try {
      const data = await cameraRef.current?.takePictureAsync()
      console.log(data)

      setImage(data?.uri ?? null)
      setImages((oldState) => [...oldState, { uri: data?.uri ?? '' }])
    } catch (error) {
      console.error(error)
    }

    setCameraOpen(false)
    setIsProcessingImage(false)
  }

  function deleteImage (index: number): void {
    setImages((oldImages: ImageType[]) => {
      const newImages = [...oldImages]
      newImages.splice(index, 1)
      return newImages
    })
  }

  async function saveImage (): Promise<void> {
    if (image === null) return

    try {
      await MediaLibrary.createAssetAsync(image)

      alert('Foto salva')

      setImage(null)
    } catch (error) {
      console.error(error)
    }
  }

  function openGallery (pressedPhoto: number): void {
    setIsGalleryVisible(true)
    setPhotoToOpen(pressedPhoto)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Coloque até 5 fotos do animal para identificá-lo
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.thumbnailBox}>
          {images.map((image, index) => (
            <ImageThumbnail
              key={index}
              image={image}
              index={index}
              openGallery={openGallery}
              deleteImage={deleteImage}
            />
          ))}

          {images.length < 5
            ? (
            <Pressable
              style={({ pressed }) => [pressed ? styles.pressed : null]}
              onPress={openCamera}
            >
              <MaterialIcons
                name="add-box"
                size={100}
                color="white"
                style={styles.image}
              />
            </Pressable>
              )
            : null}
        </View>
      </View>

      <View>
        <Button style={{ marginBottom: 50, marginHorizontal: 20 }}>
          Próximo
        </Button>
      </View>

      {cameraOpen && (
        <CameraModal
          cameraRef={cameraRef}
          isProcessingImage={isProcessingImage}
          setCameraOpen={setCameraOpen}
          takePicture={takePicture}
        />
      )}

      <ImageView
        images={images}
        imageIndex={photoToOpen}
        visible={isGalleryVisible}
        onRequestClose={() => {
          setIsGalleryVisible(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  imageContainer: {
    /*  height: deviceHeight * 0.4, */
    backgroundColor: Colors.primaryPurple,
    width: deviceWidth
  },
  thumbnailBox: {
    flexWrap: 'wrap',
    justifyContent: 'center',

    flexDirection: 'row'
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }]
  }
})