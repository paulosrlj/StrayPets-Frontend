export interface PetTypeResponse {
  id: number
  name: string
  type: string
  gender: string
  breed: string
  adoption_date: Date
  comments: string
  missing: boolean
  location: LocationType
  photos: PhotosType[]

}

export interface LocationType {
  id: number
  latitude: number
  longitude: number
  address: AddressType
}

export interface AddressType {
  cep: string
  logradouro: string
  bairro: string
  cidade: string
}

export interface PhotosType {
  id: number
  photo_name: string
  photo_uri: string
}
