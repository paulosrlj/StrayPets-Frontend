import { type LocationObject } from 'expo-location'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Toast from 'react-native-root-toast'
import PermissionError from '../../errors/PermissionError'
import useLocationPermission from '../../hooks/useLocationPermission'
import { type PetData, defaultPetData } from '../../types/PetTypes'
import { alertToast } from '../../utils/toastConfig'
import PetDataRegister from './PetDataRegister'
import PhotoRegister from './PhotoRegister'

const deviceWidth = Dimensions.get('window').width
interface Props {
  route: any
}

export default function PetRegister ({ route }: Props): JSX.Element {
  const [formPage, setFormPage] = useState(1)

  const requestLocationPermission = useLocationPermission()

  const [petData, setPetData] = useState<PetData>({
    ...defaultPetData
  })

  function nextPage (): void {
    setFormPage((oldState) => oldState + 1)
  }

  function backPage (): void {
    setFormPage((oldState) => oldState - 1)
  }

  useEffect(() => {
    const getLocation = async (): Promise<LocationObject> => {
      const currentPosition = await requestLocationPermission()
      console.log('Localização atual:', currentPosition)

      return currentPosition
    }

    getLocation()
      .then(response => {
        setPetData(oldData => ({ ...oldData, location: { latitude: response.coords.latitude, longitude: response.coords.longitude } }))
      })
      .catch(error => {
        if (error instanceof PermissionError) {
          Toast.show(error.message, alertToast)
        }
      })
  }, [requestLocationPermission])

  return (
    <View style={styles.container}>
      {formPage === 1 && (
        <PhotoRegister
          advancePage={nextPage}
          petData={petData}
          setPetData={setPetData}
        />
      )}
      {formPage === 2 && (
        <PetDataRegister
          petData={petData}
          setPetData={setPetData}
          backPage={backPage}
        />
      )}
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
