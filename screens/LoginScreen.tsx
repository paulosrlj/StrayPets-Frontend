import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux'
import Button from '../components/Button/Button'
import { login } from '../store/slices/AuthSlice'
import { Colors } from '../utils/Colors'
import { alertToast } from '../utils/toastConfig'

import AppLogo from '../assets/login_screen.svg'
import useAxiosInstance from '../hooks/useAxiosInstance'
import { type JwtStorageDecoded } from '../types/ApiResponseTypes'

interface AuthResponse {
  token: string
}

interface AuthBadResponse {
  detail: string
}

interface ValidationItem {
  name: string
  userMessage: string
}

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const axiosInstance = useAxiosInstance()

  useLayoutEffect(() => {
    const storage = new MMKV({ id: 'stray-pets' })

    const data = storage.getString('user')

    if (data) {
      const user: JwtStorageDecoded = JSON.parse(data)

      dispatch(login(user.token))
    }
  }, [dispatch])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<any>()

  function validateFields (): boolean {
    if (email.length === 0) {
      Toast.show('E-mail inválido!', alertToast)
      return false
    }

    if (password.length < 6) {
      Toast.show('A senha não pode ter menos que 6 caracteres!', alertToast)
      return false
    }

    return true
  }

  const handleLogin = async (): Promise<void> => {
    if (!validateFields()) {
      return
    }

    try {
      const response = await axiosInstance.post(
        '/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      const { token } = response.data as AuthResponse
      console.log(token)

      dispatch(login(token))
      navigation.navigate('BottomTabs')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response) {
          if (error?.response.data?.objects) {
            const validationErrors = error.response.data.objects as ValidationItem[]
            Toast.show(validationErrors[0].userMessage, alertToast)
          } else {
            const { detail } = error.response.data as AuthBadResponse
            Toast.show(detail, alertToast)
          }
        }
      } else {
        Toast.show('Ocorreu um erro ao tentar fazer login', alertToast)
      }
    }
  }

  function handleGoToSignUp (): void {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <AppLogo width="250" height="250" />
      <Text style={styles.title}>Stray Pets</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button style={{ width: '100%' }} onPress={handleLogin}>
        Entrar
      </Button>
      <Button
        backgroundColor={Colors.primaryGreen}
        style={{ width: '100%' }}
        onPress={handleGoToSignUp}
      >
        Registrar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    padding: 10,
    color: Colors.primaryPurple
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 6,
    padding: 10
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginImage: {
    width: 100,
    height: 100
  }
})

export default LoginScreen
