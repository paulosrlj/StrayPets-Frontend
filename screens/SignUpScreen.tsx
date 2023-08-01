import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AxiosError } from 'axios'
import Toast from 'react-native-root-toast'
import { useDispatch } from 'react-redux'
import Button from '../components/Button/Button'
import { Colors } from '../utils/Colors'
import axiosInstance from '../utils/api/axios'
import { alertToast, successToast } from '../utils/toastConfig'

import SignUpSvg from '../assets/signup.svg'

interface AuthResponse {
  token: string
}

interface AuthBadResponse {
  detail: string
}

const SignUpScreen = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isValidating, setisValidating] = useState(false)

  const navigation = useNavigation<any>()

  const dispatch = useDispatch()

  function validateEmail (email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailPattern.test(email)
  }

  function validateFields (): boolean {
    if (!validateEmail(email)) {
      Toast.show('E-mail inválido!', alertToast)
      return false
    }

    if (password.length < 6) {
      Toast.show('A senha não pode ter menos que 6 caracteres!', alertToast)
      return false
    }

    return true
  }

  const handleSignUp = async (): Promise<void> => {
    setisValidating(true)
    if (!validateFields()) {
      setisValidating(false)
      return
    }

    // Aqui você pode implementar a lógica para autenticar o usuário
    // Por exemplo, enviar as credenciais para o servidor e verificar se são válidas
    console.log('Email:', email)
    console.log('Senha:', password)

    try {
      await axiosInstance.post(
        '/api/auth/register',
        { email, password, role: 'USER' },
        { headers: { 'Content-Type': 'application/json' } }
      )

      Toast.show('Usuário criado!', successToast)
      navigation.navigate('Login')
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response) {
          const { detail } = error.response.data as AuthBadResponse
          Toast.show(detail, alertToast)
        }
      } else {
        Toast.show('Ocorreu um erro ao tentar fazer login', alertToast)
      }
    }

    /* const { token } = response.data as AuthResponse
    console.log(token) */

    setisValidating(false)
  }

  function goBack (): void {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <SignUpSvg width="250" height="250" />
      <Text style={styles.title}>
        Criar uma nova conta
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite uma senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button
        backgroundColor={Colors.primaryGreen}
        style={{ width: '100%' }}
        onPress={handleSignUp}
        disabled={isValidating}
      >
        Se registrar
      </Button>
      <Button
        backgroundColor={Colors.primaryRed}
        style={{ width: '100%' }}
        onPress={goBack}
      >
        Voltar
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
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    padding: 10
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

export default SignUpScreen
