import { AxiosError } from 'axios'
import React, { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Toast from 'react-native-root-toast'
import Button from '../../components/Button/Button'
import SelectField from '../../components/Form/SelectField'
import TextField from '../../components/Form/TextField'
import axiosInstance from '../../utils/api/axios'
import { Colors } from '../../utils/Colors'
import { alertToast, infoToast } from '../../utils/toastConfig'

import { useNavigation } from '@react-navigation/native'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'
import { defaultPetData, type PetData, type PetImageType } from '../../types/PetTypes'

interface FormInfoType {
  name: string
  gender: string
  type: string
  breed: string
  comments: string
  missing: boolean
}

enum FieldToUpdate {
  name,
  gender,
  type,
  breed,
  comments,
  missing
}

interface PetDataToSend {
  name?: string
  type: string
  breed?: string
  gender?: string
  comments?: string
  location: {
    latitude: number
    longitude: number
  }
  missing: boolean
}

interface ImageType {
  name: string
  uri: string
  type: string
}

const deviceWidth = Dimensions.get('window').width

interface Props {
  backPage: () => void
  petData: PetData
  setPetData: React.Dispatch<React.SetStateAction<PetData>>
}

export default function PetDataRegister ({
  backPage,
  petData,
  setPetData
}: Props): JSX.Element {
  const navigation = useNavigation<any>()

  const [sendingReq, setSendingReq] = useState(false)

  function handleFormInputChange (
    value: string,
    fieldToUpdate: FieldToUpdate
  ): void {
    const field = FieldToUpdate[fieldToUpdate] as keyof FormInfoType

    setPetData((oldFormInfo) => {
      const oldState = { ...oldFormInfo }
      oldState[field] = value
      return oldState
    })
  }

  function validateFields (data: PetDataToSend): boolean {
    const allowedTypes = ['CACHORRO', 'GATO']
    const allowedGenders = ['MACHO', 'FEMEA']

    if (!allowedTypes.includes(data.type)) {
      Toast.show('Tipo de animal inválido!', alertToast)
      return false
    }
    if (data.gender && !allowedGenders.includes(data.gender)) {
      Toast.show('Gênero de animal inválido!', alertToast)
      return false
    }
    if (data.name && data.name?.length > 30) {
      Toast.show('Nome do animal muito grande!', alertToast)
      return false
    }

    return true
  }

  async function resizeImages (images: PetImageType[]): Promise<ImageType[]> {
    const resizedImages = await Promise.all(
      images.map(async (image, index) => {
        const manipResult = await manipulateAsync(
          image.uri,
          [{ resize: { width: 640, height: 1280 } }],
          {
            compress: 1,
            format: SaveFormat.JPEG
          }
        )

        return {
          name: petData.name + index.toString(),
          uri: manipResult.uri,
          type: 'image/jpeg'
        }
      })
    )

    return resizedImages
  }

  async function handleFormSubmit (): Promise<void> {
    try {
      setSendingReq(true)

      if (petData.images === undefined) {
        Toast.show('As imagens estão inválidas, por favor volte e tire-as novamente.', alertToast)
        return
      }

      const formData = new FormData()

      const petDataCpy = { ...petData }
      delete petDataCpy.images

      const filteredEntries = Object.entries(petDataCpy).filter(
        ([_, value]) => value !== null && value !== ''
      )

      const dataToSend = Object.fromEntries(
        filteredEntries
      ) as unknown as PetDataToSend

      console.log(dataToSend)

      if (!validateFields(dataToSend)) {
        setSendingReq(false)
        return
      }

      const resizedImages = await resizeImages(petData.images)

      resizedImages.forEach((image) => {
        formData.append('images', image as unknown as any)
      })

      formData.append('data', JSON.stringify(dataToSend))

      Toast.show('Cadastrando, aguarde...', infoToast)

      await axiosInstance.post('/api/pet', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setPetData({ ...defaultPetData })
      backPage()
      navigation.navigate('Map')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro:', error.message)
      }
      Toast.show('Ocorreu um erro ao tentar cadastrar o pet', alertToast)
    }
    setSendingReq(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Preencha as informações do animal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TextField
          label="Nome"
          value={petData.name}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.name)
          }}
        />

        <SelectField
          acceptEmptyValue
          label="Sexo*"
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
          label="Tipo*"
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
          value={petData.breed}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.breed)
          }}
        />

        <SelectField
          label="Desaparecido*"
          pickerItems={[
            { label: 'Não', value: false },
            { label: 'Sim', value: true }
          ]}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.missing)
          }}
        />

        <TextField
          label="Observações"
          value={petData.comments}
          handleInputChange={(value: string) => {
            handleFormInputChange(value, FieldToUpdate.comments)
          }}
          textArea
        />
        <View style={styles.buttonBox}>
          <Button
            style={{ width: deviceWidth * 0.9 }}
            textColor="white"
            backgroundColor={Colors.primaryRed}
            onPress={backPage}
          >
            Voltar
          </Button>
          <Button
            style={{ width: deviceWidth * 0.9 }}
            textColor="white"
            onPress={handleFormSubmit}
            disabled={sendingReq}
          >
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
