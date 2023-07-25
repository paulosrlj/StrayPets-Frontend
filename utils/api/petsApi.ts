import { type PetTypeResponse } from '../../types/PetTypes'

import { AxiosError } from 'axios'
import { ApiError } from '../../errors/ApiError'
import { type AddressType } from '../../types/geolocationTypes'
import axios from './axios'

export async function getPetsByArea (
  state: string,
  city: string
): Promise<PetTypeResponse[]> {
  try {
    const response = await axios.get(
      `/api/pet/queryPet?state=${state}&city=${city}`
    )
    const data = response.data as PetTypeResponse[]
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError('Ocorreu um erro ao buscar os pets')
    } else {
      throw new ApiError('Ocorreu um erro ao buscar os pets')
    }
  }
}

export async function getAddress (
  latitude: number,
  longitude: number
): Promise<AddressType> {
  try {
    const response = await axios.get(
      `/api/maps?latitude=${latitude}&longitude=${longitude}`
    )

    const data = response.data as AddressType
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError('Ocorreu um erro ao buscar os dados do seu endereço')
    } else {
      throw new ApiError('Ocorreu um erro ao buscar os dados do seu endereço')
    }
  }
}
