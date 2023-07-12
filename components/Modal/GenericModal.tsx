import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

interface Props {
  children: React.ReactNode
}

export default function GenericModal ({ children }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: deviceWidth,
    height: deviceHeight,
    flex: 1,
    backgroundColor: 'cyan',
    zIndex: 999
  }
})
