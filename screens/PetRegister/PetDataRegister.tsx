import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import TextField from '../../components/Form/TextField'
import SelectField from '../../components/Form/SelectField'
import Button from '../../components/Button/Button'
import { Colors } from '../../utils/Colors'

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

const deviceWidth = Dimensions.get('window').width

export default function PetDataRegister (): JSX.Element {
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
      <View style={styles.textContainer}>
        <Text style={styles.title}>Preencha as informações do animal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer} >
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
            Cadastrar
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  scrollViewContainer: {
    marginTop: 20,
    justifyContent: 'space-between'
  },
  filterLabel: {
    // backgroundColor: 'green',
    width: deviceWidth,
    marginVertical: 10,
    fontSize: 16
  },
  locationBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonBox: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center'
  }
})
