import {
  requestForegroundPermissionsAsync
} from 'expo-location'
import { useCallback } from 'react'
import PermissionError from '../errors/PermissionError'

type RequestLocationPermissionFn = () => Promise<boolean>

const useLocationPermission = (): RequestLocationPermissionFn => {
  const requestLocationPermission =
    useCallback(async (): Promise<boolean> => {
      const { granted } = await requestForegroundPermissionsAsync()

      if (granted) {
        return true
      }
      throw new PermissionError('Localização não aceita!')
    }, [])

  return requestLocationPermission
}

export default useLocationPermission
