import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.2.104:8080',
  headers: {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTdHJheVBldHNBcGkiLCJzdWIiOiJwYXVsb0BnbWFpbC5jb20iLCJleHAiOjE2ODk4OTczMTF9.6e3iY8GYwGKXHtYpN72Dj1RpeiL_N3n6rI2J26rEPPw'}`
  }
})

export default axiosInstance
