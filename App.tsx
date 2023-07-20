import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import { RootSiblingParent } from 'react-native-root-siblings'

import Routes from './routes/Routes'
import { Colors } from './utils/Colors'

export default function App (): JSX.Element {
  return (
    <>
      {/* <LinearGradient
        // Background Linear Gradient
        colors={['#843AA7', '#983BAF', '#661C80']}
        style={[styles.rootScreen, styles.SafeAreaView]}
      > */}
      <StatusBar barStyle="light-content" />
      <RootSiblingParent>
        <Routes />
      </RootSiblingParent>
      {/* </LinearGradient> */}
    </>
  )
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  SafeAreaView: {
    // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 0
    /*  marginTop: Platform.select({
      android: StatusBar.currentHeight,
      ios: 0,
    }), */
  },

  background: {
    flex: 1
  }
})
