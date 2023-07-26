import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'
import React, { type ReactNode, type ComponentType, type FC } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store/store'

/* interface Props {
  WrappedComponent: ComponentType
}

interface WithLogicProps {
  // Adicione aqui as propriedades específicas que o HOC precisa receber
  // Por exemplo, se o HOC precisar de uma propriedade "isAdmin" do tipo boolean:
  // isAdmin: boolean;
}

// Aqui, definimos o tipo de uma função que recebe um componente genérico e retorna um novo componente com as propriedades do HOC
// O parâmetro P é um objeto genérico para receber as propriedades do componente envolvido (WrappedComponent)
type WithLogicType<P = {}> = (
  WrappedComponent: ComponentType<P & WithLogicProps>
) => FC<P> */

function PrivateScreenWrapper ({ children }) {
  const navigation = useNavigation<any>()

  const token = useSelector((state: RootState) => state.auth.token)

  if (!token) {
    return <>
      {navigation.navigate('Login')}
    </>
  } else {
    return (
      <>
      {children}
    </>
    )
  }
  // }
}

export default PrivateScreenWrapper

/* export default function PrivateRoute ({ component }: Props): JSX.Element {
  const navigation = useNavigation<any>()

  const token = useSelector((state: RootState) => state.auth.token)

  if (!token) {
    navigation.navigate('Login')
  }

  return (
    <>
   {component}
    </>
  )
}
 */
