import React, { useLayoutEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import ImageView from 'react-native-image-viewing'

import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button/Button'
import TextLabel from '../components/Text/TextLabel'
import { Colors } from '../utils/Colors'
import axiosInstance from '../utils/api/axios'

const deviceWidth = Dimensions.get('window').width

export interface PetInfoRouteParams {
  id: number
}

interface Props {
  missingPet?: boolean
  route: any
}

interface PetType {
  id: number
  name?: string
  type: string
  gender?: string
  breed?: string
  adoption_date?: string
  comments?: string
  missing: string
  location: {
    latitude: number
    longitude: number
    address: {
      cep: string
      street: string
      sub_location: string
      city: string
    }
  }
  photos: PhotoType[]
}

interface PhotoType {
  id: number
  photo_name: string
  photo_uri: string
}

const defaultValue = {
  id: 0,
  name: '',
  type: '',
  gender: '',
  breed: '',
  adoption_date: '',
  comments: '',
  missing: '',
  location: {
    latitude: 0,
    longitude: 0,
    address: {
      cep: '',
      street: '',
      sub_location: '',
      city: ''
    }
  },
  photos: []
}

interface PhotoType {
  id: number
  photo_name: string
  photo_uri: string
}

export default function PetInfo ({ missingPet, route }: Props & PetInfoRouteParams): JSX.Element {
  const [loading, setLoading] = useState(true)

  const [visible, setIsVisible] = useState(false)
  const [imageToOpen, setImageToOpen] = useState(0)
  const [pet, setPet] = useState<PetType>({ ...defaultValue })

  const navigation = useNavigation<any>()

  useLayoutEffect(() => {
    let id

    async function fetchPet (id: number): Promise<PetType> {
      const pet = await axiosInstance.get(`/api/pet/${id}`)
      const data = pet.data as PetType
      console.log(data.photos)
      return data
    }

    if (route?.params?.id !== undefined) {
      id = route.params.id as number

      fetchPet(id)
        .then(response => {
          setPet(response)
          setLoading(false)
        })
        .catch(error => {
          console.error(error)
          setLoading(false)
        })
    } else if (route?.params?.petData !== undefined) {
      setPet(route.params.petData)
    }
  }, [route.params.id, route.params.petData])

  function handleImagePress (index: number): void {
    setImageToOpen(index)
    setIsVisible(true)
  }

  const photoUris = pet.photos.map((photo: PhotoType) => ({ uri: photo.photo_uri }))

  function handlePressMap (): void {
    navigation.navigate('Map', { latitude: pet.location.latitude, longitude: pet.location.longitude })
  }

  return (
    <View style={styles.container}>
      <View style={styles.petContainer}>
        {loading
          ? (
          <Text>Carregando...</Text>
            )
          : (
          <>
          <FlatList
          data={pet.photos}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                handleImagePress(index)
              }}
            >
              <Image key={index} source={{ uri: item.photo_uri }} style={styles.petImage} />
            </Pressable>
          )}
          horizontal
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />

        <ImageView
          images={photoUris}
          imageIndex={imageToOpen}
          visible={visible}
          onRequestClose={() => {
            setIsVisible(false)
          }}
        />
        <ScrollView>
          <View style={styles.textContainer}>
            <TextLabel textLabel="Nome" innerText={pet.name?.length === 0 ? 'N/A' : pet.name}/>

            <TextLabel textLabel="Tipo" innerText={pet.type} />

            <TextLabel textLabel="Raça" innerText={pet.breed ?? 'N/A'} />

            <TextLabel textLabel="Localização" innerText={pet.location.address.city ?? 'N/A'} />

            <TextLabel
              textLabel="Endereço aproximado"
              innerText={pet.location.address.street}
            />

            <TextLabel textLabel="Adotado" innerText={pet.adoption_date ? 'Sim' : 'Não'} />

            {pet.adoption_date
              ? (
              <TextLabel textLabel="Data de adoção" innerText={new Date(pet.adoption_date).toLocaleDateString()} />
                )
              : null}

            <TextLabel textLabel="Desaparecido" innerText={pet.missing ? 'Sim' : 'Não'} />

            <TextLabel
              textLabel="Observações"
              innerText={pet.comments?.length === 0 ? 'N/A' : pet.comments}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            style={{ marginBottom: 10, width: deviceWidth * 0.8 }}
            textColor="white"
            backgroundColor={Colors.primaryBlue}
            onPress={() => { handlePressMap() }}
          >
            Mostrar no mapa
          </Button>
          <Button
            style={{ marginBottom: 10, width: deviceWidth * 0.8 }}
            textColor="white"
            backgroundColor={Colors.primaryGreen}
          >
            {missingPet ? 'Eu encontrei esse pet!' : 'Eu adotei esse pet!'}
          </Button>
        </View>
          </>
            )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: '#e8e8e8'
  },

  petContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listContainer: {
    maxHeight: 250,
    minHeight: 250
  },
  petImage: {
    width: deviceWidth,
    height: 250,
    minHeight: 250
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 40
  },
  textLabel: {
    marginVertical: 5
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  innerText: {
    fontWeight: 'normal'
  },
  buttonContainer: {

  },
  buttonSpacing: {
    marginRight: 10
  }
})
