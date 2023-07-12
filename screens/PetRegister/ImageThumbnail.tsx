import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../utils/Colors'

interface ImageType {
  uri: string
}

interface Props {
  index: number
  image: ImageType
  deleteImage: (index: number) => void
  openGallery: (index: number) => void
}

export default function ImageThumbnail ({
  openGallery,
  deleteImage,
  index,
  image
}: Props): JSX.Element {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.imageClose,
          pressed ? styles.pressed : null
        ]}
        onPress={() => {
          deleteImage(index)
        }}
      >
        <Ionicons name="close" size={20} color={'white'} />
      </Pressable>

      <Pressable
        onPress={() => {
          openGallery(index)
        }}
      >
        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'green'
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.9 }]
  },
  imageClose: {
    width: 30,
    height: 30,
    backgroundColor: Colors.primaryRed,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '2%',
    right: '0%',
    zIndex: 999
  }
})
