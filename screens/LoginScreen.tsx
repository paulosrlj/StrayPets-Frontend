import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux'
import Button from '../components/Button/Button'
import { login } from '../store/slices/AuthSlice'
import { Colors } from '../utils/Colors'
import axiosInstance from '../utils/api/axios'
import { alertToast } from '../utils/toastConfig'

import AppLogo from '../assets/login_screen.svg'

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

interface ValidationErrorResponse {
  status: number
  detail: string
  title: string
  userMessage: string
  objects: ValidationItem[]
}

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<any>()

  const dispatch = useDispatch()

  const handleLogin = async (): Promise<void> => {
    console.log('Email:', email)
    console.log('Senha:', password)

    try {
      const response = await axiosInstance.post(
        '/api/auth/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      )

      const { token } = response.data as AuthResponse

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
