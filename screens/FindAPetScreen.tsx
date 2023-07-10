import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView
} from 'react-native'
import React, { useState } from 'react'

import PickerField from '../components/Form/PickerField'
import Button from '../components/Button/Button'
import { Colors } from '../utils/Colors'

import { Ionicons } from '@expo/vector-icons'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

interface FormInfoType {
  petName: string
  petType: string
  petBreed: string
  cep: string
}

enum FieldToUpdate {
  petName,
  petType,
  petBreed,
  cep,
}

export default function FindAPetScreen (): JSX.Element {
  const [selectedLanguage, setSelectedLanguage] = useState()

  const [formInfo, setFormInfo] = useState<FormInfoType>({
    petName: '',
    petType: '',
    petBreed: '',
    cep: ''
  })

  function handleFormInputChange (
    value: string,
    fieldToUpdate: FieldToUpdate
  ): void {
    const field = FieldToUpdate[fieldToUpdate]

    setFormInfo((oldFormInfo) => {
      const oldState = { ...oldFormInfo }
      oldState[field] = value
      return oldState
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.filterField}>
          <Text style={styles.filterLabel}>Nome: </Text>
          <TextInput
            value={formInfo.petName}
            style={[styles.textInput, styles.border]}
            cursorColor="black"
            editable
            onChangeText={(e) => {
              handleFormInputChange(e, FieldToUpdate.petName)
            }}
          />
        </View>

        <View style={styles.filterField}>
          <Text style={styles.filterLabel}>Tipo: </Text>
          <PickerField
            pickerItems={[
              { label: 'Cachorro', value: 'dog' },
              { label: 'Gato', value: 'cat' }
            ]}
            onChange={(e) => {
              handleFormInputChange(e, FieldToUpdate.petType)
            }}
          />
        </View>

        <View style={styles.filterField}>
          <Text style={styles.filterLabel}>Raça: </Text>
          <PickerField
            acceptEmptyValue
            pickerItems={[
              { label: 'Poddle', value: 'poddle' },
              { label: 'Golden Retriever', value: 'golden retriever' }
            ]}
            onChange={(e) => {
              handleFormInputChange(e, FieldToUpdate.petName)
            }}
          />
        </View>

        <View style={styles.filterField}>
          <Text style={styles.filterLabel}>CEP: </Text>
          <TextInput
            value={formInfo.cep}
            style={[styles.textInput, styles.border]}
            cursorColor="black"
            onChangeText={(e) => {
              handleFormInputChange(e, FieldToUpdate.cep)
            }}
            keyboardType="number-pad"
            editable={false}
          />
           <Text style={styles.filterLabel}>
              Cajazeiras - PB, 58900-000, Brasil{' '}
            </Text>
          <View style={styles.locationBox}>
            <Button style={{ width: deviceWidth * 0.9 }} textColor="white" backgroundColor={Colors.primaryGreen}>
              {/* <Ionicons name="locate" size={24} color={Colors.primaryGreen} style={{ }} /> */}{' '}
              Usar Localização atual
            </Button>
          </View>
        </View>

        <View style={styles.buttonBox}>
          <Button style={{ width: deviceWidth * 0.9 }} textColor="white">
            Buscar
          </Button>
        </View>
      </ScrollView>
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
