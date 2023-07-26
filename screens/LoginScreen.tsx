import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
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
    // Aqui você pode implementar a lógica para autenticar o usuário
    // Por exemplo, enviar as credenciais para o servidor e verificar se são válidas
    console.log('Email:', email)
    console.log('Senha:', password)

    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password }, { headers: { 'Content-Type': 'application/json' } })

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <Button backgroundColor={Colors.primaryGreen} style={{ width: '100%' }} onPress={handleLogin}>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
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
  }
})

export default LoginScreen
