import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://192.168.2.104:8080',
  headers: {
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJTdHJheVBldHNBcGkiLCJzdWIiOiJwYXVsb0BnbWFpbC5jb20iLCJleHAiOjE2ODk4ODk4NDZ9.7p1QM8yxyO-U_7N5eBdt3WQGKOSImrw8w3e3w1IXSwI'}`
  }
})

export default axiosInstance
