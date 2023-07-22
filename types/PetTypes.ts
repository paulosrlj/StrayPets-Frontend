export interface PetTypeResponse {
  id: number
  name?: string
  type: string
  gender?: string
  breed?: string
  adoption_date?: Date
  comments?: string
  missing?: boolean
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
  full_address: string
  cep: string
  street?: string
  sub_locality?: string
  city?: string
}

export interface PhotosType {
  id: number
  photo_name: string
  photo_uri: string
}

export const defaultPetTypeResponseValues = {
  id: 0,
  name: '',
  type: '',
  gender: '',
  breed: '',
  adoption_date: new Date(),
  comments: '',
  missing: false,
  location: {

  },
  photos: [
  ]
}

export interface PetImageType {
  uri: string
  format: string
}

export interface PetData {
  name: string
  type: string
  breed: string
  gender: string
  comments: string
  location: {
    latitude: number
    longitude: number
  }
  images?: PetImageType[]
  missing: boolean
}

export const defaultPetData = {
  name: '',
  type: '',
  breed: '',
  gender: '',
  comments: '',
  location: {
    latitude: 0,
    longitude: 0
  },
  images: [],
  missing: false
}
