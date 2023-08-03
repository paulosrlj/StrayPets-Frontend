import axios from 'axios'

import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig!.extra!.apiUrl as string

const axiosInstance = axios.create({
  baseURL: apiUrl
})

export default axiosInstance
