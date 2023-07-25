import axios from 'axios'

import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig!.extra!.apiUrl as string
const jwtToken = Constants.expoConfig!.extra!.jwtToken as string

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${jwtToken}`
  }
})

export default axiosInstance
