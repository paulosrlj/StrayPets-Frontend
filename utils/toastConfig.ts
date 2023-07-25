import Toast, { type ToastOptions } from 'react-native-root-toast'
import { Dimensions } from 'react-native'
import { Colors } from './Colors'

const deviceWidth = Dimensions.get('window').width

const commonConfig: ToastOptions = {
  duration: Toast.durations.LONG,
  position: Toast.positions.TOP,
  shadow: true,
  animation: true,
  hideOnPress: true,
  delay: 0,
  opacity: 1,
  containerStyle: { width: deviceWidth * 0.9 }
}

export const alertToast: ToastOptions = {
  ...commonConfig,
  backgroundColor: Colors.primaryRed,
  textColor: 'white'
}

export const successToast: ToastOptions = {
  ...commonConfig,
  backgroundColor: Colors.primaryGreen,
  textColor: 'white'
}

export const infoToast: ToastOptions = {
  ...commonConfig,
  backgroundColor: Colors.primaryBlue,
  textColor: 'white'
}

export const apiToast: ToastOptions = {
  ...commonConfig,
  backgroundColor: Colors.primaryBlue,
  textColor: 'white',
  duration: Toast.durations.SHORT
}
