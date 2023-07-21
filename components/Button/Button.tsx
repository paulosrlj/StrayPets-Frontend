import React, { type ReactNode } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle
} from 'react-native'
import { Colors } from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons'
interface Props {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backgroundColor?: string
  textColor?: string
  onPress?: any
  icon?: keyof typeof Ionicons.glyphMap
  disabled?: boolean
}

export default function Button ({
  children,
  style,
  backgroundColor,
  textColor,
  onPress,
  icon,
  disabled = false
}: Props): JSX.Element {
  if (disabled) {
    backgroundColor = Colors.primaryDisabled
  }

  return (
    <Pressable
    disabled={disabled}
      style={({ pressed }) => (
        [
          styles.button,
          style,
          { backgroundColor: backgroundColor ?? Colors.primaryBlue },
          (!disabled && pressed) ? styles.buttonOpacity : null
        ]
      )}
      onPress={onPress}
    >
      {icon && (<Ionicons name={icon} size={20} color="white" style={styles.icon}/>)}

      <Text style={[styles.buttonText, { color: textColor ?? 'white' }]}>
        {children}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginRight: 5
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
