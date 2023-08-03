import { useSelector } from 'react-redux'
import { type RootState } from '../store/store'
import getAxiosInstance from '../utils/api/getAxiosInstance'
import { type AxiosInstance } from 'axios'

const useAxiosInstance = (): AxiosInstance => {
  const token = useSelector((state: RootState) => state.auth.token)
  const axiosInstance = getAxiosInstance({ authorization: token })

  return axiosInstance
}

export default useAxiosInstance
