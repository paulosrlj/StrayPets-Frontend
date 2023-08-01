import React from 'react'
import { StyleSheet, View } from 'react-native'
import PetInfo from '../../screens/PetInfo'
import CloseButton from './CloseButton'

interface Props {
  onPressCloseButton: () => void
  missing?: boolean
}

export default function PetInfoModal ({
  onPressCloseButton,
  missing = false
}: Props): JSX.Element {
  return (
    <>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <CloseButton onPress={onPressCloseButton} />
        <PetInfo missingPet={missing} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000a3'
  },
  container: {
    flex: 1,
    position: 'absolute',
    top: '3%',
    left: '3%',
    width: '94%',
    height: '94%',
    borderRadius: 8,
    backgroundColor: 'green'
  }
})
