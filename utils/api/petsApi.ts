import { type PetTypeResponse } from '../../types/PetTypes'

import axios from './axios'
import { type AddressType } from '../../types/geolocationTypes'

export async function getPetsByArea (state: string, city: string): Promise<PetTypeResponse[]> {
  const response = await axios.get(
      `/api/pet/queryPet?state=${state}&city=${city}`
  )
  const data = response.data as PetTypeResponse[]

  return data
}

export async function getAddress (latitude: number, longitude: number): Promise<AddressType> {
  const response = await axios.get(
      `/api/maps?latitude=${latitude}&longitude=${longitude}`
  )
  const data = response.data as AddressType

  return data
}
