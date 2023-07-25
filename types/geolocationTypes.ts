export interface AddressType {
  latitude: number
  longitude: number
  latitudeDelta: number
  longitudeDelta: number
  full_address: string
  street: string
  sub_location: string
  city: string
  cep: string
  state: string
}

export interface SimpleLocation {
  latitude: number
  longitude: number
}

export const defaultValues = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0,
  full_address: '',
  street: '',
  sub_location: '',
  city: '',
  cep: '',
  state: ''
}
