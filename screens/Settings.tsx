import React from 'react'
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { AntDesign, FontAwesome } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/AuthSlice'
import { Colors } from '../utils/Colors'

import { AxiosError } from 'axios'
import Toast from 'react-native-root-toast'
import { type RootState } from '../store/store'
import { type AuthBadResponse, type ValidationErrorResponse } from '../types/ApiResponseTypes'
import { alertToast } from '../utils/toastConfig'
import useAxiosInstance from '../hooks/useAxiosInstance'

export default function Settings (): JSX.Element {
  const dispath = useDispatch()
  const authInfo = useSelector((state: RootState) => state.auth)
  const axiosInstance = useAxiosInstance()

  function handleLogout (): void {
    dispath(logout())
  }

  function confirmAccountDeactivation (): void {
    Alert.alert('Desativação de conta', 'Você realmente deseja desativar a sua conta?', [
      {
        text: 'Cancelar',
        onPress: () => { console.log('Cancel Pressed') },
        style: 'cancel'
      },
      { text: 'Sim', onPress: async () => { await handleDeactivateAccount() } }
    ])
  }

  async function handleDeactivateAccount (): Promise<void> {
    try {
      await axiosInstance.put(`/api/auth/deactivate-account/${authInfo.userId}`)
      handleLogout()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response) {
          if (error?.response.data) {
            const errorRes = error.response.data as ValidationErrorResponse
            Toast.show(errorRes.userMessage, alertToast)
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.settingsContainer}>
          {/* <View style={styles.settingBox}>
            <Text style={styles.text}>Usuário</Text>
            <Text style={[styles.text, styles.textValue]}>paulosrlj</Text>
          </View> */}
          {/* <View style={styles.settingBox}>
            <Text style={styles.text}>Senha</Text>
            <TextInput
              style={[styles.text, styles.textValue]}
              value="senha"
              secureTextEntry
            />
          </View> */}

          <View style={styles.settingBox}>
            <Text style={styles.text}>Email</Text>
            <Text style={[styles.text, styles.textValue]}>
              {authInfo.userEmail}
            </Text>
          </View>

          <View style={styles.settingBox}>
            <Text style={styles.text}>Reportar Bug</Text>
            <Text style={[styles.text, styles.textValue]}><FontAwesome name="bug" size={24} color="black" /></Text>
          </View>

          <Pressable style={({ pressed }) => [pressed ? styles.pressed : null]} onPress={confirmAccountDeactivation}>
            <View style={[styles.settingBox, styles.deleteBox]}>
              <Text style={[styles.text, styles.deleteText]}>
                Desativar conta
              </Text>
              <Text style={[styles.text, styles.textValue]}>
                <FontAwesome
                  name="arrow-right"
                  size={24}
                  color={Colors.primaryRed}
                />
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={({ pressed }) => [pressed ? styles.pressed : null]}
            onPress={handleLogout}
          >
            <View style={[styles.settingBox, styles.deleteBox]}>
              <Text style={[styles.text, styles.deleteText]}>Deslogar</Text>
              <Text style={[styles.text, styles.textValue]}>
                <AntDesign name="logout" size={24} color={Colors.primaryRed} />
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  settingsContainer: {},
  settingBox: {
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black'
  },
  text: {
    fontSize: 16
  },
  textValue: {
    color: 'gray'
  },
  deleteText: {
    color: Colors.primaryRed
  },
  deleteBox: {
    borderColor: Colors.primaryRed
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }]
  }
})
