import { View, Text, TextInput, StyleSheet, Dimensions, type KeyboardTypeOptions } from 'react-native'
import React, { type ReactNode } from 'react'

const deviceWidth = Dimensions.get('window').width

interface Props {
  label: string
  value: string
  editable?: boolean
  textArea?: boolean
  keyboardType?: KeyboardTypeOptions | undefined
  handleInputChange: (value: string) => void
  children?: ReactNode
  maxLength?: number
}

export default function TextField ({
  label,
  value,
  editable = true,
  textArea = false,
  maxLength = 50,
  keyboardType,
  handleInputChange,
  children
}: Props): JSX.Element {
  return (
    <View style={styles.filterField}>
      <Text style={styles.filterLabel}>{label}: </Text>
      <TextInput
        value={value}
        style={[styles.textInput, styles.border]}
        cursorColor="black"
        editable={editable}
        onChangeText={handleInputChange}
        keyboardType={keyboardType}
        multiline={textArea}
        maxLength={textArea ? 256 : maxLength}
      />
      {children ?? null}
    </View>
  )
}

const styles = StyleSheet.create({
  filterField: {
    textShadowColor: '#585858',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    /* marginVertical: 5, */
    marginHorizontal: 10,
    padding: 5
  },
  filterLabel: {
    width: deviceWidth,
    marginVertical: 10,
    fontSize: 16
  },
  textInput: {
    padding: 10
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  }
})
