import React, { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import Button from '../components/Button/Button'
import { Colors } from '../utils/Colors'

import SelectField from '../components/Form/SelectField'
import TextField from '../components/Form/TextField'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

interface FormInfoType {
  petName: string
  petGender: string
  petType: string
  petBreed: string
  cep: string
  observations: string
}

enum FieldToUpdate {
  petName,
  petGender,
  petType,
  petBreed,
  cep,
  observations,
}

export default function FindAPetScreen (): JSX.Element {
  const [formInfo, setFormInfo] = useState<FormInfoType>({
    petName: '',
    petGender: '',
    petType: '',
    petBreed: '',
    cep: '',
    observations: ''
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
        <TextField
          label="Nome"
          value={formInfo.petName}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.petName)
          }}
        />

        <SelectField
          label="Sexo"
          pickerItems={[
            { label: 'Macho', value: 'male' },
            { label: 'Fêmea', value: 'female' }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.petGender)
          }}
        />

        <SelectField
          label="Tipo"
          pickerItems={[
            { label: 'Cachorro', value: 'dog' },
            { label: 'Gato', value: 'cat' }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.petType)
          }}
        />

        <SelectField
          label="Raça"
          pickerItems={[
            { label: 'Poddle', value: 'poddle' },
            { label: 'Golden Retriever', value: 'golden retriever' }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.petBreed)
          }}
        />

        <TextField
          label="Cep"
          value={formInfo.cep}
          keyboardType="number-pad"
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.cep)
          }}
        >
          <Text style={styles.filterLabel}>
            Cajazeiras - PB, 58900-000, Brasil{' '}
          </Text>
          <View style={styles.locationBox}>
            <Button
              style={{ width: deviceWidth * 0.9 }}
              textColor="white"
              backgroundColor={Colors.primaryGreen}
            >
              Usar localização atual
            </Button>
          </View>
        </TextField>

        <TextField
          label="Observações"
          value={formInfo.observations}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.observations)
          }}
          textArea
        />

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
