import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import ImageView from 'react-native-image-viewing'

import PetImage from './dog.jpg'
import PetImage2 from './dog2.jpg'
import PetImage3 from './dog3.png'

import Button from '../components/Button/Button'
import TextLabel from '../components/Text/TextLabel'
import { Colors } from '../utils/Colors'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

console.log(deviceHeight)
console.log(deviceWidth)

const Pets = [PetImage, PetImage2, PetImage3]

const images = [
  {
    uri: PetImage
  },
  {
    uri: PetImage2
  },
  {
    uri: PetImage3
  }
]

interface Props {
  missingPet?: boolean
}

export default function PetInfo ({ missingPet }: Props): JSX.Element {
  const [visible, setIsVisible] = useState(false)
  const [imageToOpen, setImageToOpen] = useState(0)

  function handleImagePress (index: number): void {
    setImageToOpen(index)
    setIsVisible(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.petContainer}>
        <FlatList
          data={Pets}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                handleImagePress(index)
              }}
            >
              <Image key={index} source={item} style={styles.petImage} />
            </Pressable>
          )}
          horizontal
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />

        <ImageView
          images={Pets}
          imageIndex={imageToOpen}
          visible={visible}
          onRequestClose={() => {
            setIsVisible(false)
          }}
        />
        <ScrollView>
          <View style={styles.textContainer}>
            <TextLabel textLabel="Nome" innerText="Bolinha" />

            <TextLabel textLabel="Tipo" innerText="Cachorro" />

            <TextLabel textLabel="Raça" innerText="Golden Retriver" />

            <TextLabel textLabel="Localização" innerText="Cajazeiras-PB" />

            <TextLabel
              textLabel="Endereço aproximado"
              innerText="Rua Julio Pajeu"
            />

            <TextLabel textLabel="Adotado" innerText="Não" />

            <TextLabel textLabel="Data de adoção" innerText="20/02/2023" />

            <TextLabel textLabel="Desaparecido" innerText="Não" />

            <TextLabel
              textLabel="Observações"
              innerText="aifsagjoiasjgiosajogjsagigojasoigjoasjgojasogjaosgjoasjgoajsogjasfgyasugyusaugasgasfgasufgusagfuasgfuagsufgasfguasgfuyaguyashfashfkjsakfsakfhkashfkhakfhka"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            style={{ marginBottom: 10, width: deviceWidth * 0.8 }}
            textColor="white"
            backgroundColor={Colors.primaryBlue}
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
    alignItems: 'center'
  },
  listContainer: {
    maxHeight: 250,
    minHeight: 250
  },
  petImage: {
    width: deviceWidth,
    height: 250,
    minHeight: 250,
    backgroundColor: 'red'

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
