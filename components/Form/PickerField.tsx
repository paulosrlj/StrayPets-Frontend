import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

const deviceWidth = Dimensions.get('window').width

interface PickerItemType {
  label: string
  value: string
}

interface Props {
  pickerItems: PickerItemType[]
  acceptEmptyValue?: boolean
  onChange: (value: string) => void
}

export default function PickerField ({
  pickerItems,
  acceptEmptyValue = false,
  onChange
}: Props): JSX.Element {
  const [value, setSelectedValue] = useState<string>('')

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue)
          onChange(itemValue)
        }}
        style={styles.filterPicker}
      >
        {acceptEmptyValue
          ? (
          <Picker.Item key="N/A" label="N/A" value="N/A" />
            )
          : null}
        {pickerItems.map((item, index) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
            style={styles.filterItem}
          />
        ))}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  filterPicker: {
    width: deviceWidth * 0.95,
    textAlign: 'center'
  },
  filterItem: {
    fontSize: 16
  }
})
