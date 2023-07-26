import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView
} from 'react-native'
import React from 'react'

import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { Colors } from '../utils/Colors'
import { useDispatch } from 'react-redux'
import { logout } from '../store/slices/AuthSlice'

export default function Settings (): JSX.Element {
  const dispath = useDispatch()

  function handleLogout (): void {
    dispath(logout())
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.settingsContainer}>
          <View style={styles.settingBox}>
            <Text style={styles.text}>Usuário</Text>
            <Text style={[styles.text, styles.textValue]}>paulosrlj</Text>
          </View>
          <View style={styles.settingBox}>
            <Text style={styles.text}>Senha</Text>
            <TextInput
              style={[styles.text, styles.textValue]}
              value="senha"
              secureTextEntry
            />
          </View>

          <View style={styles.settingBox}>
            <Text style={styles.text}>Email</Text>
            <Text style={[styles.text, styles.textValue]}>
              paulosrlj1214@gmail.com
            </Text>
          </View>

          <View style={styles.settingBox}>
            <Text style={styles.text}>Telefone</Text>
            <Text style={[styles.text, styles.textValue]}>(83) 99577-4612</Text>
          </View>

          <Pressable style={({ pressed }) => [pressed ? styles.pressed : null]}>
            <View style={[styles.settingBox, styles.deleteBox]}>
              <Text style={[styles.text, styles.deleteText]}>
                Deletar conta
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
