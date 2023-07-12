import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import PhotoRegister from './PhotoRegister'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default function PetRegister (): JSX.Element {
  return (
    <View style={styles.container}>
      <PhotoRegister />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    /*  backgroundColor: 'yellow', */
    justifyContent: 'space-between'
  },
  container: {
    flex: 1
    /* backgroundColor: 'red' */
  },
  containerPos: {},
  filterField: {
    /* borderLeftWidth: 0, */
    // borderRightWidth: 0,
    textShadowColor: '#585858',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 5
    // backgroundColor: 'yellow',
  },
  filterLabel: {
    // backgroundColor: 'green',
    width: deviceWidth,
    marginVertical: 10,
    fontSize: 16
  },
  filterPicker: {
    // backgroundColor: 'red',
    width: deviceWidth * 0.7,
    textAlign: 'center'
  },
  textInput: {
    padding: 10
  },
  locationBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  buttonBox: {
    marginVertical: 20,
    alignItems: 'center'
  }
})
