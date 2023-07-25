import 'dotenv/config'

const apiUrl = process.env.EXPO_PUBLIC_API_URL
const jwtToken = process.env.EXPO_PUBLIC_API_AUTHORIZATION
const googleCloudKey = process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY

module.exports = ({ config }) => {
  return {
    ...config,
    android: {
      config: {
        googleMaps: {
          apiKey: googleCloudKey
        }
      },
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      permissions: [
        'android.permission.ACCESS_COARSE_LOCATION',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.FOREGROUND_SERVICE',
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO'
      ],
      package: 'com.togakureryu.straypets'
    },
    extra: {
      apiUrl,
      jwtToken,
      eas: {
        projectId: '952bb45f-3023-4071-aea4-a2f15279a7c7'
      }
    }
  }
}
