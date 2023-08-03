import axios, { type AxiosInstance } from 'axios'
import Constants from 'expo-constants'

const apiUrl = Constants.expoConfig!.extra!.apiUrl as string

interface AxiosConfig {
  authorization: string
}

const getAxiosInstance = (config: AxiosConfig): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${config.authorization}`
    }
  })

  return axiosInstance
}

export default getAxiosInstance
