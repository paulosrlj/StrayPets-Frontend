import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import Button from '../components/Button/Button'
import axiosInstance from '../utils/api/axios'
import { AxiosError } from 'axios'
import Toast from 'react-native-root-toast'
import { alertToast } from '../utils/toastConfig'
import { type RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slices/AuthSlice'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../utils/Colors'

import AppLogo from '../assets/login_screen.svg'

import Svg, { SvgXml } from 'react-native-svg'

interface AuthResponse {
  token: string
}

interface AuthBadResponse {
  detail: string
}

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<any>()

  /*   const token = useSelector((state: RootState) => state.auth.token)
   */ const dispatch = useDispatch()

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
          const { detail } = error.response.data as AuthBadResponse
          Toast.show(detail, alertToast)
        }
      } else {
        Toast.show('Ocorreu um erro ao tentar fazer login', alertToast)
      }
    }

    /* const { token } = response.data as AuthResponse
    console.log(token) */
  }

  function handleGoToSignUp (): void {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>

      <AppLogo width="250" height="250"/>
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
