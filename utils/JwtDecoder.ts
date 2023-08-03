import jwtDecode from 'jwt-decode'
import { type JwtDecoded } from '../types/ApiResponseTypes'

const decodeJwtToken = (token: string): JwtDecoded | null => {
  try {
    const decodedToken: JwtDecoded = jwtDecode(token)

    return decodedToken
  } catch (error) {
    console.error('Erro ao decodificar o token:', error)
    return null
  }
}

export { decodeJwtToken }
