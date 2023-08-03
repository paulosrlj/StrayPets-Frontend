export interface AuthResponse {
  token: string
}

export interface AuthBadResponse {
  detail: string
}

export interface ValidationItem {
  name: string
  userMessage: string
}

export interface ValidationErrorResponse {
  status: number
  detail: string
  title: string
  userMessage: string
  objects: ValidationItem[]
}

export interface JwtDecoded {
  exp: number
  iss: string
  jti: string
  sub: string
}

export interface JwtStorageDecoded {
  expiration: number
  userEmail: string
  userId: string
  token: string
}
