import { useCallback } from 'react'
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  type LocationObject
} from 'expo-location'
import PermissionError from '../errors/PermissionError'

// Defina aqui o tipo para a função de permissão de localização
type RequestLocationPermissionFn = () => Promise<LocationObject>

const useLocationPermission = (): RequestLocationPermissionFn => {
  const requestLocationPermission = useCallback(async (): Promise<LocationObject> => {
    const { granted } = await requestForegroundPermissionsAsync()

    if (granted) {
      const currentPosition = await getCurrentPositionAsync()

      if (currentPosition === null) {
        throw new PermissionError('Ocorreu um erro ao obter a posição.')
      }

      return currentPosition
    }

    throw new PermissionError('A permissão de localização não foi aceita.')
  }, [])

  return requestLocationPermission
}

export default useLocationPermission
