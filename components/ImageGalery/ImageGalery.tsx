import React from 'react'
import { Dimensions, FlatList, Image, Pressable, StyleSheet } from 'react-native'
import ImageView from 'react-native-image-viewing'

interface DataItem {
  uri: string
}

interface Props {
  imagesByUri?: boolean
  data: DataItem[]
  visible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const deviceWidth = Dimensions.get('window').width

export default function ImageGalery ({ data, setIsVisible, visible }: Props): JSX.Element {
  console.log('here: ', data)

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              setIsVisible(true)
            }}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
          </Pressable>
        )}
        horizontal
        style={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />

      <ImageView
        images={data }
        imageIndex={0}
        visible={visible}
        onRequestClose={() => {
          setIsVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: 300
  },
  image: {
    width: deviceWidth,
    height: 250,
    marginTop: 40
  }
})
