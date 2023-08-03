import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { decodeJwtToken } from '../../utils/JwtDecoder'
import Toast from 'react-native-root-toast'
import { alertToast } from '../../utils/toastConfig'
import { MMKV } from 'react-native-mmkv'

export interface AuthState {
  token: string
  userId: number
  userEmail: string
  expirationDate: number
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: '',
  userEmail: '',
  expirationDate: -1,
  userId: -1,
  isAuthenticated: false
}

const storage = new MMKV({ id: 'stray-pets' })

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      const decodedToken = decodeJwtToken(action.payload)

      if (decodedToken === null) {
        Toast.show('Ocorreu um erro ao tentar fazer o login', alertToast)
        return
      }

      const { exp: expiration, jti: userId, sub: userEmail } = decodedToken

      state.userEmail = userEmail
      state.userId = Number.parseInt(userId)
      state.expirationDate = expiration
      state.token = action.payload
      state.isAuthenticated = true

      storage.set('user', JSON.stringify({ email: userEmail, id: userId, token: action.payload, expiration }))
    },
    logout: (state) => {
      state.token = ''
      state.isAuthenticated = false

      storage.delete('user')
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = AuthSlice.actions

export default AuthSlice.reducer
