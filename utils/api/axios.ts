import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.2.104:8080',
  headers: {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTdHJheVBldHNBcGkiLCJzdWIiOiJwYXVsb0BnbWFpbC5jb20iLCJleHAiOjE2ODk5NjgwNDZ9.-bhrY9DkDH45BA_H_LCCUAqD-OHeRSx0GRrBZAmREOU'}`
  }
})

export default axiosInstance
