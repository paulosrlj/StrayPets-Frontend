import { LocationAccuracy, type LocationObject, getCurrentPositionAsync } from 'expo-location'
import { Platform } from 'react-native'
import { GetLocationError, TimetoutLocationError } from '../errors/GetLocationError'

async function delay (timeInMilliseconds: number): Promise<null> {
  return await new Promise<null>((resolve) => {
    setTimeout(() => { resolve(null) }, timeInMilliseconds)
  })
}

export async function getLocation (): Promise<LocationObject> {
  const ANDROID_DELAY_IN_MS = 4 * 1000 // 👈 4s
  const IOS_DELAY_IN_MS = 15 * 1000 // 👈 15s

  const DELAY_IN_MS =
    Platform.OS === 'ios' ? IOS_DELAY_IN_MS : ANDROID_DELAY_IN_MS

  const MAX_TRIES = 3
  let tries = 1

  let location: LocationObject | null = null

  let locationError: Error | null = null

  do {
    try {
      location = await Promise.race([
        delay(DELAY_IN_MS),
        getCurrentPositionAsync({
          accuracy: LocationAccuracy.BestForNavigation,
          distanceInterval: 0
        })
      ])

      if (!location) {
        throw new TimetoutLocationError('O servidor demorou muito para responder a localização')
      }
    } catch (err) {
      locationError = err as Error
    } finally {
      tries += 1
    }
  } while (!location && tries <= MAX_TRIES)

  if (!location) {
    const error = locationError ?? new GetLocationError('Ocorreu um erro ao obter a localização')

    throw error
  }

  return location
}
