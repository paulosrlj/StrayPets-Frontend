import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import PickerField from './PickerField'

const deviceWidth = Dimensions.get('window').width

interface PickerItemType {
  label: string
  value: string
}

interface Props {
  label: string
  pickerItems: PickerItemType[]
  handleInputChange: (value: string) => void
}

export default function SelectField ({
  label,
  handleInputChange,
  pickerItems
}: Props): JSX.Element {
  return (
    <View style={styles.filterField}>
      <Text style={styles.filterLabel}>{label}: </Text>
      <PickerField
        pickerItems={pickerItems}
        onChange={handleInputChange}
      />
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
  }
})
