import 'expo-dev-client'
import 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { lightTheme, darkTheme, themeStatus } from './utils/theme'
import { SignedInStack, SignedOutStack } from './navigation/ScreenStack'
import CircularIcon from './components/ui/CircularIcon'
import useStore from './zustand/useStore'
import { supabase } from './utils/supabase/config'
import { LargeSecureStore } from "./utils/SecureLocalStorage"

const Stack = createNativeStackNavigator()

export default function App() {
  const currentThemeStatus = useStore((state) => state.currentThemeStatus)
  const setThemeStatus = useStore((state) => state.setThemeStatus)
  const selectedTheme =
    currentThemeStatus == themeStatus.light ? lightTheme : darkTheme

  const setSession = useStore((state) => state.setSession)
  const globalStateEncryptedSession = useStore((state) => state.session)
  const removeSession = useStore((state) => state.removeSession)
  const largeSecureStore = new LargeSecureStore()

  //! realtime event listener for session management
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      //! call the setItem in which it encrypt the session and store in secure local storage
      encryptedSession = await largeSecureStore.setItem(
        'session',
        JSON.stringify(session),
      )

      //! set encrypted session as global state
      setSession(encryptedSession)
    } else if (event === 'SIGNED_OUT') {
      //! remove encrypted session from secure local storage
      await largeSecureStore.removeItem('session')

      //! remove encrypted session as a global state
      removeSession()
    }
  })

  useEffect(() => {
    const initThemeCheck = async () => {
      setThemeStatus(await AsyncStorage.getItem('theme'))
    }

    initThemeCheck()
  }, [])

  /*
   *
   *
   * Native Stack Navigator Default Screen Configuration
   *
   */

  // Add a default header to all screens
  const screenOptions = ({ navigation }) => ({
    presentation: 'containedTransparentModal',
    animation: 'fade',
    contentStyle: { backgroundColor: selectedTheme.colors.background },
    headerStyle: { backgroundColor: selectedTheme.colors.background },
    headerShadowVisible: false,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: selectedTheme.colors.typography.primary,
    },
    headerLeft: () => (
      <CircularIcon
        name="arrow-back"
        pressable
        onPress={() => navigation.goBack()}
      />
    ),
  })

  return (
    <PaperProvider theme={selectedTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          {globalStateEncryptedSession ? SignedInStack : SignedOutStack}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
