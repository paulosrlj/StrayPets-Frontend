import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import PetInfoModal from '../components/PetInfo/PetInfoModal'
import { type PetTypeResponse } from '../types/PetTypes'

interface PetBoxProps {
  image: string
  onPress: any
}

function PetBox ({ image, onPress }: PetBoxProps): JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [pressed ? styles.pressed : null]}
      onPress={onPress}
    >
      <View style={styles.petBox}>
        <Image source={{ uri: image }} style={styles.petImage} />
      </View>
    </Pressable>
  )
}

interface Props {
  route: any
}

export default function PetList ({ route }: Props): JSX.Element {
  const navigation = useNavigation<any>()

  const [pets, setPets] = useState<PetTypeResponse[]>([])

  const [modalVisible, setModalVisible] = useState(false)

  function handleImagePress (id: number): void {
    navigation.navigate('PetInfo', { id })
  }

  useLayoutEffect(() => {
    if (route?.params !== undefined) {
      setPets(route.params.pets)
    }
  }, [route])

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <FlatList
          data={pets}
          renderItem={({ item, index }) => (
            <PetBox
              image={item.photos[0].photo_uri}
              onPress={() => { handleImagePress(item.id) }}
            />
          )}
          contentContainerStyle={styles.petImages}
        />

        {modalVisible && (
          <PetInfoModal
            onPressCloseButton={() => {
              setModalVisible(false)
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  petBox: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  petImages: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }]
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: 'green'
  },
  imageClose: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primaryRed,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '1%',
    left: '1%',
    zIndex: 999
  }
})
