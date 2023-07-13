import React from 'react'
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../utils/Colors'

interface Props {
  onPress?: () => void
  propStyles?: StyleProp<ViewStyle>
}

export default function CloseButton ({ onPress, propStyles }: Props): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.imageClose,
        pressed ? styles.pressed : null,
        propStyles
      ]}
      onPress={onPress}
    >
      <Ionicons name="close" size={20} color={'white'} />
    </Pressable>
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
    top: '-1%',
    right: '-1%',
    zIndex: 999
  }
})
