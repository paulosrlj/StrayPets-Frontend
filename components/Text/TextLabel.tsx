import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Props {
  textLabel: string
  innerText: string
}

export default function TextLabel ({ textLabel, innerText }: Props): JSX.Element {
  return (
    <View style={styles.textLabel}>
      <Text style={styles.text}>
        {textLabel}: <Text style={styles.innerText}>{innerText}</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textLabel: {
    marginVertical: 5
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  innerText: {
    fontWeight: 'normal'
  }
})
