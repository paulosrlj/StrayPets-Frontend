import React from 'react'
import { StatusBar } from 'react-native'
import { store } from './store/store'
import { Provider } from 'react-redux'

import { RootSiblingParent } from 'react-native-root-siblings'

import Routes from './routes/Routes'

export default function App (): JSX.Element {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <RootSiblingParent>
          <Routes />
        </RootSiblingParent>
      </Provider>
    </>
  )
}
