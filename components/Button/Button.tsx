import {
  View,
  Text,
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle
} from 'react-native'
import React, { type ReactNode } from 'react'
import { Colors } from '../../utils/Colors'

interface Props {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  textColor?: string
}

export default function Button ({
  children,
  style,
  backgroundColor,
  textColor
}: Props): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => (
        [
          styles.button,
          style,
          { backgroundColor: backgroundColor ?? Colors.primaryBlue },
          pressed ? styles.buttonOpacity : null
        ]
      )}
    >
      <Text style={[styles.buttonText, { color: textColor ?? 'black' }]}>
        {children}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 6
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16
  },
  buttonOpacity: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }]
  }
})
