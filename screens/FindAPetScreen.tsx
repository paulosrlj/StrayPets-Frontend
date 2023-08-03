import React, { useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'

import Button from '../components/Button/Button'
import { Colors } from '../utils/Colors'

import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-root-toast'
import SelectField from '../components/Form/SelectField'
import TextField from '../components/Form/TextField'
import useLocationPermission from '../hooks/useLocationPermission'
import { type PetTypeResponse } from '../types/PetTypes'
import { type AddressType } from '../types/geolocationTypes'
import { getAddress } from '../utils/api/petsApi'
import { getLocation } from '../utils/geolocation'
import { alertToast, infoToast } from '../utils/toastConfig'
import useAxiosInstance from '../hooks/useAxiosInstance'

const deviceWidth = Dimensions.get('window').width

interface FormInfoType {
  name: string
  gender: string
  type: string
  breed: string
  cep: string
  comments: string
}

enum FieldToUpdate {
  name,
  gender,
  type,
  breed,
  cep,
  comments,
}

export default function FindAPetScreen (): JSX.Element {
  const axiosInstance = useAxiosInstance()

  const navigator = useNavigation<any>()

  const [location, setLocation] = useState<AddressType>()
  const [formValid, setFormValid] = useState(true)
  const [fetching, setFetching] = useState(false)

  const requestLocation = useLocationPermission()

  const [formInfo, setFormInfo] = useState<FormInfoType>({
    name: '',
    gender: '',
    type: '',
    breed: '',
    cep: '',
    comments: ''
  })

  function formatCep (cep: string): string {
    return cep.replace(/(\d{5})(\d)/, '$1-$2')
  }

  function handleFormInputChange (
    value: string,
    fieldToUpdate: FieldToUpdate
  ): void {
    const field = FieldToUpdate[fieldToUpdate] as keyof FormInfoType

    if (field === 'cep' && value.length >= 5) {
      value = formatCep(value)
    }

    setFormInfo((oldFormInfo) => {
      const oldState = { ...oldFormInfo }
      oldState[field] = value
      return oldState
    })

    console.log(formInfo)
  }

  async function handleUserPermission (): Promise<void> {
    setFetching(true)
    const granted = await requestLocation()

    if (!granted) {
      setFetching(false)
      Toast.show('Permissão não concedida!', alertToast)
      return
    }

    const { coords } = await getLocation()

    const address = await getAddress(coords.latitude, coords.longitude)
    setLocation(address)
    setFormInfo((oldData) => ({ ...oldData, cep: address.cep }))
    setFetching(false)
  }

  function validateFields (): boolean {
    setFormValid(false)

    // Check if at least one field is not empty
    const isValid = Object.values(formInfo).some((value) => value)
    if (!isValid) {
      Toast.show('Preencha pelo menos 1 campo!', alertToast)
      setFormValid(true)

      return false
    }

    if (formInfo.cep.length > 0 && formInfo.cep.length < 9) {
      Toast.show('Cep inválido!', alertToast)
      setFormValid(true)
      return false
    }

    setFormValid(true)
    return true
  }

  async function fetchPets (): Promise<void> {
    if (!validateFields()) return

    let queryParams = ''

    if (formInfo.name.length > 0) {
      queryParams += `name=${formInfo.name}&`
    }

    if (formInfo.type.length > 0) {
      queryParams += `type=${formInfo.type}&`
    }

    if (formInfo.breed.length > 0) {
      queryParams += `breed=${formInfo.breed}&`
    }

    if (formInfo.gender.length > 0) {
      queryParams += `gender=${formInfo.gender}&`
    }

    if (formInfo.cep.length > 0) {
      queryParams += `cep=${formInfo.cep}&`
    }

    if (formInfo.comments.length > 0) {
      queryParams += `comments=${formInfo.comments}`
    }

    if (queryParams.endsWith('&')) {
      queryParams = queryParams.slice(0, -1)
    }

    setFormValid(false)
    Toast.show('Buscando, aguarde...', infoToast)
    console.log(queryParams)

    try {
      const pets = await axiosInstance.get(`/api/pet/queryPet?${queryParams}`)
      const data = pets.data as PetTypeResponse

      navigator.navigate('PetList', { pets: data })
    } catch (error) {
      Toast.show('Ocorreu um erro ao tentar buscar.', alertToast)
    }

    setFormValid(true)
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TextField
          label="Nome"
          value={formInfo.name}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.name)
          }}
        />

        <SelectField
          acceptEmptyValue
          label="Sexo"
          pickerItems={[
            { label: 'Macho', value: 'MACHO' },
            { label: 'Fêmea', value: 'FEMEA' }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.gender)
          }}
        />

        <SelectField
          acceptEmptyValue
          label="Tipo"
          pickerItems={[
            { label: 'Cachorro', value: 'CACHORRO' },
            { label: 'Gato', value: 'GATO' }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.type)
          }}
        />

        <TextField
          label="Raça"
          value={formInfo.breed}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.breed)
          }}
        />

        <TextField
          label="Cep"
          value={formInfo.cep}
          keyboardType="number-pad"
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.cep)
          }}
          maxLength={9}
        >
          {location && (
            <Text style={styles.filterLabel}>{location.full_address}</Text>
          )}
          <View style={styles.locationBox}>
            <Button
              style={{ width: deviceWidth * 0.9 }}
              textColor="white"
              backgroundColor={Colors.primaryGreen}
              onPress={handleUserPermission}
              disabled={fetching}
            >
              Usar localização atual
            </Button>
          </View>
        </TextField>

        <TextField
          label="Observações"
          value={formInfo.comments}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.comments)
          }}
          textArea
        />

        <View style={styles.buttonBox}>
          <Button
            disabled={!formValid}
            style={{ width: deviceWidth * 0.9 }}
            textColor="white"
            onPress={fetchPets}
          >
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
