import React, { useState } from 'react'
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  FlatList
} from 'react-native'
import ImageView from 'react-native-image-viewing'

import PetImage from './dog.jpg'
import PetImage2 from './dog2.jpg'
import PetImage3 from './dog3.png'

import Button from '../components/Button/Button'
import { Colors } from '../utils/Colors'
import TextLabel from '../components/Text/TextLabel'

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

export default function PetInfo (): JSX.Element {
  const [visible, setIsVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.petContainer}>
        <FlatList
          data={Pets}
          renderItem={({ item }) => (
            <Pressable onPress={() => { setIsVisible(true) }}>
              <Image source={item} style={styles.petImage} />
            </Pressable>
          )}
          horizontal
          style={styles.listContainer}
          showsHorizontalScrollIndicator={false}
        />

        <ImageView
          images={Pets}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => {
            setIsVisible(false)
          }}
        />

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

          {/* <TextLabel textLabel="Observações" innerText="aifsagjoiasjgiosajogjsagigojasoigjoasjgojasogjaosgjoasjgoajsogjasfgyasugyusaugasgasfgasufgusagfuasgfuagsufgasfguasgfuyaguyashfashfkjsakfsakfhkashfkhakfhka" /> */}
        </View>
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
            Eu adotei esse pet!
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
    maxHeight: 300
    // backgroundColor: 'yellow'
  },
  petImage: {
    width: deviceWidth,
    height: 250,
    marginTop: 40
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 40
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
  buttonContainer: {},
  buttonSpacing: {
    marginRight: 10
  }
})
